import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma-simple'
import { handleApiError, createSuccessResponse } from '@/lib/api-error'
import { storyCardCreateSchema } from '@/lib/dtos/story'

// GET /api/admin/story-cards?restaurantId=xxx
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const restaurantId = searchParams.get('restaurantId')

    if (!restaurantId) {
      return Response.json(
        { success: false, error: { message: 'restaurantId is required', code: 'MISSING_PARAM' } },
        { status: 400 }
      )
    }

    const storyCards = await prisma.storyCard.findMany({
      where: {
        restaurantId,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return createSuccessResponse(storyCards)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/admin/story-cards
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = storyCardCreateSchema.parse(body)

    // Get the max order for this restaurant to append new story card at the end
    const maxOrder = await prisma.storyCard.findFirst({
      where: { restaurantId: validatedData.restaurantId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const storyCard = await prisma.storyCard.create({
      data: {
        ...validatedData,
        order: validatedData.order ?? (maxOrder?.order ?? -1) + 1,
      },
    })

    return createSuccessResponse(storyCard, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
