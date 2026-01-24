import { NextRequest } from "next/server";
import { prisma } from "@/lib/prsima-simple";
import { createSuccessResponse, handleApiError } from "@/lib/api-error";
import { addCorsHeaders } from "@/lib/cors";

interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function GET(
    req: NextRequest,
    { params }: PageProps
) {
    try {
        const { slug } = await params;

        // 1️⃣ Find restaurant by slug
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                slug,
                isActive: true,
            },
        });

        if (!restaurant) {
            return createSuccessResponse(
                { message: "Restaurant not found" },
                404,
                addCorsHeaders()
            );
        }

        // 2️⃣ Fetch categories
        const categories = await prisma.category.findMany({
            where: {
                restaurantId: restaurant.id,
                isActive: true,
            },
            orderBy: { order: "asc" },
        });

        // 3️⃣ Fetch menu items
        const items = await prisma.menuItem.findMany({
            where: {
                restaurantId: restaurant.id,
                available: true,
            },
            // orderBy: { order: "asc" },
        });

        return createSuccessResponse(
            {
                restaurant,
                categories,
                items,
            },
            200,
            addCorsHeaders()
        );
    } catch (error) {
        return handleApiError(error, addCorsHeaders());
    }
}
