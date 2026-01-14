import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma-simple'
import { revalidateTag } from 'next/cache'
import { ApiError, createSuccessResponse, handleApiError } from '@/lib/api-error'
import { restaurantUpdateSchema } from '@/lib/dtos/restaurant'

// GET /api/admin/restaurants/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const restaurant = await prisma.restaurant.findUnique({
      where: { id, isActive: true },
    })

    if (!restaurant) {
      throw new ApiError(404, 'NOT_FOUND', 'Restaurant not found')
    }

    return createSuccessResponse(restaurant)
  } catch (error) {
    return handleApiError(error)
  }
}

// PATCH /api/admin/restaurants/[id]
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const body = await request.json()
    const validatedData = restaurantUpdateSchema.parse(body)

    const restaurant = await prisma.restaurant.update({
      where: { id },
      data: validatedData,
    })

    // Invalidate customer menu cache
    //@ts-ignore
    revalidateTag(`menu-${id}`)

    return createSuccessResponse(restaurant)
  } catch (error) {
    return handleApiError(error)
  }
}
