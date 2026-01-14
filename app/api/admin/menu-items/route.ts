import { NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma-simple'
import { createSuccessResponse, handleApiError } from '@/lib/api-error'
import { menuItemCreateSchema } from '@/lib/dtos/menuItem'

// GET /api/admin/menu-items?restaurantId=xxx
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

    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurantId,
        isActive: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return createSuccessResponse(menuItems)
  } catch (error) {
    return handleApiError(error)
  }
}

// POST /api/admin/menu-items
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = menuItemCreateSchema.parse(body)

    const menuItem = await prisma.menuItem.create({
      data: validatedData,
    })

    return createSuccessResponse(menuItem, 201)
  } catch (error) {
    return handleApiError(error)
  }
}
