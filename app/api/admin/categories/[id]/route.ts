import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma-simple";
import {
  handleApiError,
  createSuccessResponse,
  ApiError,
} from "@/lib/api-error";
import { revalidateTag } from "next/cache";
import { categoryUpdateSchema } from "@/lib/dtos/category";
import { addCorsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/admin/categories/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const category = await prisma.category.findUnique({
      where: { id, isActive: true },
    });

    if (!category) {
      throw new ApiError(404, "NOT_FOUND", "Category not found");
    }

    return createSuccessResponse(category, 200, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}

// PATCH /api/admin/categories/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = categoryUpdateSchema.parse(body);

    // Get category to find restaurantId for cache invalidation
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      select: { restaurantId: true },
    });

    if (!existingCategory) {
      throw new ApiError(404, "NOT_FOUND", "Category not found");
    }

    const category = await prisma.category.update({
      where: { id },
      data: validatedData,
    });

    // Invalidate customer menu cache
    //@ts-ignore
    revalidateTag(`menu-${existingCategory.restaurantId}`);

    return createSuccessResponse(category, 200, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}

// DELETE /api/admin/categories/[id] - Soft delete
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Get category to find restaurantId
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      select: { restaurantId: true },
    });

    if (!existingCategory) {
      throw new ApiError(404, "NOT_FOUND", "Category not found");
    }

    // Soft delete category and all its menu items in a transaction
    await prisma.$transaction([
      // Soft delete the category
      prisma.category.update({
        where: { id },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      }),
      // Soft delete all menu items in this category
      prisma.menuItem.updateMany({
        where: { categoryId: id },
        data: {
          isActive: false,
          deletedAt: new Date(),
        },
      }),
    ]);

    // Invalidate customer menu cache
    //@ts-ignore
    revalidateTag(`menu-${existingCategory.restaurantId}`);

    return createSuccessResponse(
      { message: "Category deleted successfully" },
      200,
      addCorsHeaders()
    );
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}