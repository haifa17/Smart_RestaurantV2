import { NextRequest } from "next/server";
import { createSuccessResponse, handleApiError } from "@/lib/api-error";
import { menuItemCreateSchema } from "@/lib/dtos/menuItem";
import { addCorsHeaders, handleOptions } from "@/lib/cors";
import { prisma } from "@/lib/prsima-simple";

export async function OPTIONS() {
  return handleOptions();
}

// GET /api/admin/menu-items?restaurantId=xxx
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
        { status: 400, headers: addCorsHeaders() },
      );
    }

    const menuItems = await prisma.menuItem.findMany({
      where: {
        restaurantId,
        isActive: true,
      },
      include: {
        sauces: true,
        cheeses: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return createSuccessResponse(menuItems, 200, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}

// POST /api/admin/menu-items
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = menuItemCreateSchema.parse(body);
    const { sauces, cheeses, ...menuItemData } = validatedData;

    const menuItem = await prisma.menuItem.create({
      data: {
        ...menuItemData,
        available: menuItemData.available ?? true,
        isActive: menuItemData.isActive ?? true,

        // ✅ Create related sauces only if array has items
        // Empty array or undefined = no sauces created
        ...(sauces && sauces.length > 0
          ? {
              sauces: {
                create: sauces.map((sauce) => ({
                  sauceType: sauce.sauceType,
                  customName: sauce.customName,
                  isIncluded: sauce.isIncluded ?? true,
                  extraCost: sauce.extraCost,
                })),
              },
            }
          : {}),

        // ✅ Create related cheeses only if array has items
        // Empty array or undefined = no cheeses created
        ...(cheeses && cheeses.length > 0
          ? {
              cheeses: {
                create: cheeses.map((cheese) => ({
                  cheeseType: cheese.cheeseType,
                  customName: cheese.customName,
                  isIncluded: cheese.isIncluded ?? true,
                  extraCost: cheese.extraCost,
                })),
              },
            }
          : {}),
      },
      // ✅ Include relations in response
      include: {
        sauces: true,
        cheeses: true,
      },
    });

    return createSuccessResponse(menuItem, 201, addCorsHeaders());
  } catch (error) {
    return handleApiError(error, addCorsHeaders());
  }
}
