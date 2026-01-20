import { prisma } from "@/lib/prsima-simple";
import { handleApiError, createSuccessResponse } from "@/lib/api-error";

// GET /api/public/menu/[slug] - Public endpoint, no auth required
export async function GET(
    request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        if (!slug) {
            return Response.json(
                {
                    success: false,
                    error: { message: "Restaurant slug is required", code: "MISSING_PARAM" },
                },
                { status: 400 }
            );
        }

        // Fetch restaurant with categories and menu items
        const restaurant = await prisma.restaurant.findUnique({
            where: {
                slug,
                isActive: true,
            },
            select: {
                id: true,
                slug: true,
                name: true,
                phone: true,
                logo: true,
                heroImage: true,
                tagline: true,
                description: true,
                schedules: {
                    select: {
                        dayOfWeek: true,
                        opensAt: true,
                        closesAt: true,
                        isClosed: true,
                    },
                    orderBy: {
                        dayOfWeek: "asc",
                    },
                },
                categories: {
                    where: {
                        isActive: true,
                        visible: true,
                    },
                    orderBy: {
                        order: "asc",
                    },
                    select: {
                        id: true,
                        nameEn: true,
                        nameFr: true,
                        nameAr: true,
                        icon: true,
                        order: true,
                        menuItems: {
                            where: {
                                isActive: true,
                                available: true,
                            },
                            select: {
                                id: true,
                                nameEn: true,
                                nameFr: true,
                                nameAr: true,
                                descriptionEn: true,
                                descriptionFr: true,
                                descriptionAr: true,
                                price: true,
                                image: true,
                                isChefRecommendation: true,
                                isPopular: true,
                                isSpicy: true,
                                isVegetarian: true,
                            },
                        },
                    },
                },
            },
        });

        if (!restaurant) {
            return Response.json(
                {
                    success: false,
                    error: { message: "Restaurant not found", code: "NOT_FOUND" },
                },
                { status: 404 }
            );
        }

        // Transform the data to ensure proper serialization
        const menuData = {
            restaurant: {
                id: restaurant.id,
                slug: restaurant.slug,
                name: restaurant.name,
                phone: restaurant.phone,
                logo: restaurant.logo,
                heroImage: restaurant.heroImage,
                tagline: restaurant.tagline,
                description: restaurant.description,
                schedules: restaurant.schedules,
            },
            categories: restaurant.categories.map((category) => ({
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
                    price: Number(item.price),
                    image: item.image,
                    isChefRecommendation: item.isChefRecommendation,
                    isPopular: item.isPopular,
                    isSpicy: item.isSpicy,
                    isVegetarian: item.isVegetarian,
                })),
            })),
        };

        // Add cache headers for better performance
        return createSuccessResponse(menuData, 200, {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        });
    } catch (error) {
        return handleApiError(error);
    }
}
