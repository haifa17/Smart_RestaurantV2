import { NextRequest } from "next/server";
import { prisma } from "@/lib/prsima-simple";
import { revalidateTag } from "next/cache";
import {
  ApiError,
  createSuccessResponse,
  handleApiError,
} from "@/lib/api-error";
import { restaurantUpdateSchema } from "@/lib/dtos/restaurant";
import { addCorsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/admin/restaurants/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id, isActive: true },
      include: {
        schedules: true, // IMPORTANT: Include schedules
      },
    });

    if (!restaurant) {
      throw new ApiError(404, "NOT_FOUND", "Restaurant not found");
    }

    return createSuccessResponse(restaurant, 200, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}

// PATCH /api/admin/restaurants/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    // Validate the entire body (including schedules)
    const validatedData = restaurantUpdateSchema.parse(body);

    // Extract schedules from validated data
    const { schedules, ...restaurantData } = validatedData;
    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: {
        ...restaurantData,
        ...(schedules && {
          schedules: {
            deleteMany: {},
            create: schedules.map((s: any) => ({
              dayOfWeek: s.dayOfWeek,
              opensAt: s.opensAt,
              closesAt: s.closesAt,
              isClosed: s.isClosed,
            })),
          },
        }),
      },
      include: { schedules: true },
    });
    // Invalidate customer menu cache
    //@ts-ignore
    revalidateTag(`menu-${id}`);

    return createSuccessResponse(restaurant, 200, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}
