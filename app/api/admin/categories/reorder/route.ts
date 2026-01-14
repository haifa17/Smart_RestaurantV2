import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma-simple";
import { handleApiError, createSuccessResponse } from "@/lib/api-error";
import { revalidateTag } from "next/cache";
import { categoryReorderSchema } from "@/lib/dtos/category";

// PATCH /api/admin/categories/reorder
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { categories } = categoryReorderSchema.parse(body);

    // Get restaurantId from first category for cache invalidation
    const firstCategory = await prisma.category.findUnique({
      where: { id: categories[0]?.id },
      select: { restaurantId: true },
    });

    // Update all categories in a transaction
    await prisma.$transaction(
      categories.map(({ id, order }) =>
        prisma.category.update({
          where: { id },
          data: { order },
        })
      )
    );

    // Fetch updated categories
    const updatedCategories = await prisma.category.findMany({
      where: {
        id: { in: categories.map((c) => c.id) },
      },
      orderBy: { order: "asc" },
    });

    // Invalidate customer menu cache if we have a restaurantId
    if (firstCategory?.restaurantId) {
      //@ts-ignore
      revalidateTag(`menu-${firstCategory.restaurantId}`);
    }

    return createSuccessResponse(updatedCategories);
  } catch (error) {
    return handleApiError(error);
  }
}
