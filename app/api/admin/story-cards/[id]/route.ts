import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma-simple";
import {
  handleApiError,
  createSuccessResponse,
  ApiError,
} from "@/lib/api-error";
import { revalidateTag } from "next/cache";
import { storyCardUpdateSchema } from "@/lib/dtos/story";

// GET /api/admin/story-cards/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const storyCard = await prisma.storyCard.findUnique({
      where: { id, isActive: true },
    });

    if (!storyCard) {
      throw new ApiError(404, "NOT_FOUND", "Story card not found");
    }

    return createSuccessResponse(storyCard);
  } catch (error) {
    return handleApiError(error);
  }
}

// PATCH /api/admin/story-cards/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const validatedData = storyCardUpdateSchema.parse(body);

    // Get story card to find restaurantId for cache invalidation
    const existingStoryCard = await prisma.storyCard.findUnique({
      where: { id },
      select: { restaurantId: true },
    });

    if (!existingStoryCard) {
      throw new ApiError(404, "NOT_FOUND", "Story card not found");
    }

    const storyCard = await prisma.storyCard.update({
      where: { id },
      data: validatedData,
    });

    // Invalidate customer menu cache
    //@ts-ignore
    revalidateTag(`menu-${existingStoryCard.restaurantId}`);

    return createSuccessResponse(storyCard);
  } catch (error) {
    return handleApiError(error);
  }
}

// DELETE /api/admin/story-cards/[id] - Soft delete
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    // Get story card to find restaurantId
    const existingStoryCard = await prisma.storyCard.findUnique({
      where: { id },
      select: { restaurantId: true },
    });

    if (!existingStoryCard) {
      throw new ApiError(404, "NOT_FOUND", "Story card not found");
    }

    // Soft delete the story card
    await prisma.storyCard.update({
      where: { id },
      data: {
        isActive: false,
        deletedAt: new Date(),
      },
    });

    // Invalidate customer menu cache
    //@ts-ignore
    revalidateTag(`menu-${existingStoryCard.restaurantId}`);

    return createSuccessResponse({
      message: "Story card deleted successfully",
    });
  } catch (error) {
    return handleApiError(error);
  }
}
