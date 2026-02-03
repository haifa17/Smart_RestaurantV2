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

        // 1️⃣ Find restaurant by slug with schedules
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                slug,
                isActive: true,
            },
            include: {
                schedules: true,
            },
        });

        if (!restaurant) {
            return createSuccessResponse(
                { message: "Restaurant not found" },
                404,
                addCorsHeaders()
            );
        }

        // Format restaurant data for the public menu
        const formattedRestaurant = {
            id: restaurant.id,
            userId: restaurant.userId,
            slug: restaurant.slug,
            name: restaurant.name,
            phone: restaurant.phone,
            logo: restaurant.logo,
            heroImage: restaurant.heroImage,
            tagline: restaurant.tagline,
            description: restaurant.description,
            schedules: restaurant.schedules.map((s) => ({
                dayOfWeek: s.dayOfWeek,
                opensAt: s.opensAt,
                closesAt: s.closesAt,
                isClosed: s.isClosed,
            })),
        };

        // 2️⃣ Fetch categories with their menu items
        const categories = await prisma.category.findMany({
            where: {
                restaurantId: restaurant.id,
                isActive: true,
            },
            orderBy: { order: "asc" },
            include: {
                menuItems: {
                    where: {
                        available: true,
                        isActive: true,
                    },
                },
            },
        });

        // 3️⃣ Transform categories to include items in the expected format
        const categoriesWithItems = categories.map((category) => ({
            id: category.id,
            nameEn: category.nameEn,
            nameFr: category.nameFr,
            nameAr: category.nameAr,
            icon: category.icon,
            order: category.order,
            items: category.menuItems.map((item) => ({
                id: item.id,
                nameEn: item.nameEn,
                nameFr: item.nameFr,
                nameAr: item.nameAr,
                descriptionEn: item.descriptionEn,
                descriptionFr: item.descriptionFr,
                descriptionAr: item.descriptionAr,
                price: parseFloat(item.price.toString()),
                image: item.image,
                isChefRecommendation: item.isChefRecommendation,
                isPopular: item.isPopular,
                isSpicy: item.isSpicy,
                isVegetarian: item.isVegetarian,
            })),
        }));

        return createSuccessResponse(
            {
                restaurant: formattedRestaurant,
                categories: categoriesWithItems,
            },
            200,
            addCorsHeaders()
        );
    } catch (error) {
        return handleApiError(error, addCorsHeaders());
    }
}
