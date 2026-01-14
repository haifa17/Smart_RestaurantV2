import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma-simple'
import { handleApiError, createSuccessResponse } from '@/lib/api-error'
import { categoryCreateSchema } from '@/lib/dtos/category'

// GET /api/admin/categories?restaurantId=xxx
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

    const categories = await prisma.category.findMany({
      where: {
        restaurantId,
        isActive: true,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return createSuccessResponse(categories)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/admin/categories
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = categoryCreateSchema.parse(body)

    // Get the max order for this restaurant to append new category at the end
    const maxOrder = await prisma.category.findFirst({
      where: { restaurantId: validatedData.restaurantId },
      orderBy: { order: 'desc' },
      select: { order: true },
    })

    const category = await prisma.category.create({
      data: {
        ...validatedData,
        order: validatedData.order ?? (maxOrder?.order ?? -1) + 1,
      },
    })

    return createSuccessResponse(category, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
