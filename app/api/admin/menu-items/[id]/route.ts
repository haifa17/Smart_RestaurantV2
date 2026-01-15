import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma-simple";
import {
  handleApiError,
  createSuccessResponse,
  ApiError,
} from "@/lib/api-error";
import { revalidateTag } from "next/cache";
import { menuItemUpdateSchema } from "@/lib/dtos/menuItem";
import { addCorsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/admin/menu-items/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const menuItem = await prisma.menuItem.findUnique({
      where: { id, isActive: true },
    });

    if (!menuItem) {
      throw new ApiError(404, "NOT_FOUND", "Menu item not found");
    }

    return createSuccessResponse(menuItem, 200, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}

// PATCH /api/admin/menu-items/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = menuItemUpdateSchema.parse(body);

    // Get menu item to find restaurantId for cache invalidation
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
      select: { restaurantId: true },
    });

    if (!existingItem) {
      throw new ApiError(404, "NOT_FOUND", "Menu item not found");
    }

    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: validatedData,
    });

    // Invalidate customer menu cache
    //@ts-ignore
    revalidateTag(`menu-${existingItem.restaurantId}`);

    return createSuccessResponse(menuItem, 200, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}

// DELETE /api/admin/menu-items/[id] - Soft delete
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Get menu item to find restaurantId
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
      select: { restaurantId: true },
    });

    if (!existingItem) {
      throw new ApiError(404, "NOT_FOUND", "Menu item not found");
    }

    // Soft delete
    await prisma.menuItem.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });

    // Invalidate customer menu cache
    //@ts-ignore
    revalidateTag(`menu-${existingItem.restaurantId}`);

    return createSuccessResponse(
      { message: "Menu item deleted successfully" },
      200,
      addCorsHeaders()
    );
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}