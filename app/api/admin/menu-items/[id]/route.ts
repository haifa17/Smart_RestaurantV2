import { NextRequest } from "next/server";
import { prisma } from "@/lib/prsima-simple";
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
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const menuItem = await prisma.menuItem.findUnique({
      where: { id, isActive: true },
      include: {
        sauces: true,
        cheeses: true,
        supplements: true,
      },
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
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = menuItemUpdateSchema.parse(body);
    const { sauces, cheeses, supplements, ...menuItemData } = validatedData;
    // Get menu item to find restaurantId for cache invalidation
    const existingItem = await prisma.menuItem.findUnique({
      where: { id },
      select: { restaurantId: true },
    });

    if (!existingItem) {
      throw new ApiError(404, "NOT_FOUND", "Menu item not found");
    }

    // ✅ If sauces are being updated, delete old ones first
    if (sauces !== undefined) {
      await prisma.menuItemSauce.deleteMany({
        where: { menuItemId: id },
      });
    }

    // ✅ If cheeses are being updated, delete old ones first
    if (cheeses !== undefined) {
      await prisma.menuItemCheese.deleteMany({
        where: { menuItemId: id },
      });
    }
    if (supplements !== undefined) {
      await prisma.menuItemSupplement.deleteMany({
        where: { menuItemId: id },
      });
    }
    // ✅ Fixed: Wrap everything in 'data' property
    const menuItem = await prisma.menuItem.update({
      where: { id },
      data: {
        ...menuItemData,
        // ✅ Create new sauces if provided AND non-empty
        // If empty array is sent, relations are already deleted above
        ...(sauces !== undefined && sauces.length > 0
          ? {
              sauces: {
                create: sauces.map((sauce) => ({
                  sauceType: sauce.sauceType,
                  customName: sauce.customName,
                  isIncluded: sauce.isIncluded ?? true,
                  // extraCost: sauce.extraCost,
                })),
              },
            }
          : {}),

        // ✅ Create new cheeses if provided AND non-empty
        // If empty array is sent, relations are already deleted above
        ...(cheeses !== undefined && cheeses.length > 0
          ? {
              cheeses: {
                create: cheeses.map((cheese) => ({
                  cheeseType: cheese.cheeseType,
                  customName: cheese.customName,
                  isIncluded: cheese.isIncluded ?? true,
                  // extraCost: cheese.extraCost,
                })),
              },
            }
          : {}),
        ...(supplements !== undefined && supplements.length > 0
          ? {
              supplements: {
                create: supplements.map((supplement) => ({
                  name: supplement.name,
                  category: supplement.category,
                  price: supplement.price,
                  isAvailable: supplement.isAvailable ?? true,
                })),
              },
            }
          : {}),
      },
      include: {
        sauces: true,
        cheeses: true,
        supplements: true,
      },
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
  context: { params: Promise<{ id: string }> },
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
      addCorsHeaders(),
    );
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}
