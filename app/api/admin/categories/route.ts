import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma-simple";
import { handleApiError, createSuccessResponse } from "@/lib/api-error";
import { categoryCreateSchema } from "@/lib/dtos/category";
import { addCorsHeaders, handleOptions } from "@/lib/cors";

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/admin/categories?restaurantId=xxx
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const restaurantId = searchParams.get("restaurantId");

    if (!restaurantId) {
      return Response.json(
        {
          success: false,
          error: { message: "restaurantId is required", code: "MISSING_PARAM" },
        },
        {
          status: 400,
          headers: addCorsHeaders(),
        }
      );
    }

    const categories = await prisma.category.findMany({
      where: {
        restaurantId,
        isActive: true,
      },
      orderBy: {
        order: "asc",
      },
    });

    return createSuccessResponse(categories, 200, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}

// POST /api/admin/categories
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = categoryCreateSchema.parse(body);

    // Check for duplicate
    const exists = await prisma.category.findUnique({
      where: {
        restaurantId_name: {
          restaurantId: validatedData.restaurantId,
          name: validatedData.name,
        },
      },
    });

    if (exists) {
      return Response.json(
        {
          success: false,
          error: {
            message: "Category already exists",
            code: "DUPLICATE_CATEGORY",
          },
        },
        {
          status: 409,
          headers: addCorsHeaders(),
        }
      );
    }

    const maxOrder = await prisma.category.findFirst({
      where: { restaurantId: validatedData.restaurantId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const category = await prisma.category.create({
      data: {
        ...validatedData,
        order: validatedData.order ?? (maxOrder?.order ?? -1) + 1,
      },
    });

    return createSuccessResponse(category, 201, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}
