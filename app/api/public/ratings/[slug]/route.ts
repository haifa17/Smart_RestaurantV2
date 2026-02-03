import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSuccessResponse, createErrorResponse } from "@/lib/api-error";
import { addCorsHeaders } from "@/lib/cors";

// GET /api/public/ratings/[slug] - Get ratings for a restaurant
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;

        // Find restaurant by slug
        const restaurant = await prisma.restaurant.findUnique({
            where: { slug },
            select: { id: true, name: true },
        });

        if (!restaurant) {
            return createErrorResponse(404, "NOT_FOUND", "Restaurant not found", addCorsHeaders());
        }

        // Get all approved public ratings
        const ratings = await prisma.rating.findMany({
            where: {
                restaurantId: restaurant.id,
                isPublic: true,
                isApproved: true,
            },
            orderBy: { createdAt: "desc" },
            take: 50, // Limit to last 50 ratings
        });

        // Calculate stats
        const allRatings = await prisma.rating.findMany({
            where: {
                restaurantId: restaurant.id,
                isApproved: true,
            },
            select: {
                rating: true,
                foodRating: true,
                serviceRating: true,
                ambianceRating: true,
            },
        });

        const totalRatings = allRatings.length;
        const averageRating = totalRatings > 0
            ? allRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings
            : 0;

        // Rating distribution
        const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        allRatings.forEach((r) => {
            if (r.rating >= 1 && r.rating <= 5) {
                distribution[r.rating as 1 | 2 | 3 | 4 | 5]++;
            }
        });

        // Category averages
        const foodRatings = allRatings.filter((r) => r.foodRating).map((r) => r.foodRating!);
        const serviceRatings = allRatings.filter((r) => r.serviceRating).map((r) => r.serviceRating!);
        const ambianceRatings = allRatings.filter((r) => r.ambianceRating).map((r) => r.ambianceRating!);

        const stats = {
            averageRating: Math.round(averageRating * 10) / 10,
            totalRatings,
            ratingDistribution: distribution,
            averageFoodRating: foodRatings.length > 0
                ? Math.round((foodRatings.reduce((a, b) => a + b, 0) / foodRatings.length) * 10) / 10
                : null,
            averageServiceRating: serviceRatings.length > 0
                ? Math.round((serviceRatings.reduce((a, b) => a + b, 0) / serviceRatings.length) * 10) / 10
                : null,
            averageAmbianceRating: ambianceRatings.length > 0
                ? Math.round((ambianceRatings.reduce((a, b) => a + b, 0) / ambianceRatings.length) * 10) / 10
                : null,
        };

        return createSuccessResponse({ ratings, stats }, 200, addCorsHeaders());
    } catch (error) {
        console.error("[Ratings API] Error:", error);
        return createErrorResponse(500, "INTERNAL_ERROR", "Failed to fetch ratings", addCorsHeaders());
    }
}

// POST /api/public/ratings/[slug] - Submit a new rating
export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        // Validate input
        const { rating, comment, customerName, orderId, foodRating, serviceRating, ambianceRating } = body;

        if (!rating || rating < 1 || rating > 5) {
            return createErrorResponse(400, "INVALID_INPUT", "Rating must be between 1 and 5", addCorsHeaders());
        }

        // Find restaurant by slug
        const restaurant = await prisma.restaurant.findUnique({
            where: { slug },
            select: { id: true },
        });

        if (!restaurant) {
            return createErrorResponse(404, "NOT_FOUND", "Restaurant not found", addCorsHeaders());
        }

        // If orderId provided, verify it exists and hasn't been rated yet
        if (orderId) {
            const order = await prisma.order.findUnique({
                where: { id: orderId },
                include: { rating: true },
            });

            if (!order) {
                return createErrorResponse(404, "NOT_FOUND", "Order not found", addCorsHeaders());
            }

            if (order.restaurantId !== restaurant.id) {
                return createErrorResponse(400, "INVALID_INPUT", "Order does not belong to this restaurant", addCorsHeaders());
            }

            if (order.rating) {
                return createErrorResponse(400, "ALREADY_RATED", "This order has already been rated", addCorsHeaders());
            }
        }

        // Create rating
        const newRating = await prisma.rating.create({
            data: {
                restaurantId: restaurant.id,
                orderId: orderId || null,
                rating: Math.round(rating),
                comment: comment?.trim() || null,
                customerName: customerName?.trim() || null,
                foodRating: foodRating ? Math.round(foodRating) : null,
                serviceRating: serviceRating ? Math.round(serviceRating) : null,
                ambianceRating: ambianceRating ? Math.round(ambianceRating) : null,
                isPublic: true,
                isApproved: true, // Auto-approve, admin can hide later if needed
            },
        });

        return createSuccessResponse(newRating, 201, addCorsHeaders());
    } catch (error) {
        console.error("[Ratings API] Error:", error);
        return createErrorResponse(500, "INTERNAL_ERROR", "Failed to submit rating", addCorsHeaders());
    }
}

// OPTIONS for CORS
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: addCorsHeaders(),
    });
}
