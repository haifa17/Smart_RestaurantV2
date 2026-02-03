import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSuccessResponse, createErrorResponse, ApiError } from "@/lib/api-error";
import { addCorsHeaders } from "@/lib/cors";

// GET /api/admin/restaurants/[id]/ratings - Get all ratings for admin
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: restaurantId } = await params;

        const ratings = await prisma.rating.findMany({
            where: { restaurantId },
            include: {
                order: {
                    select: {
                        orderNumber: true,
                        total: true,
                        customerName: true,
                        createdAt: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        // Calculate stats
        const totalRatings = ratings.length;
        const approvedRatings = ratings.filter((r) => r.isApproved);
        const averageRating = approvedRatings.length > 0
            ? approvedRatings.reduce((sum, r) => sum + r.rating, 0) / approvedRatings.length
            : 0;

        const stats = {
            totalRatings,
            approvedRatings: approvedRatings.length,
            pendingRatings: ratings.filter((r) => !r.isApproved).length,
            averageRating: Math.round(averageRating * 10) / 10,
        };

        return createSuccessResponse({ ratings, stats }, 200, addCorsHeaders());
    } catch (error) {
        console.error("[Admin Ratings API] Error:", error);
        if (error instanceof ApiError) {
            return createErrorResponse(error.statusCode, error.code, error.message, addCorsHeaders());
        }
        return createErrorResponse(500, "INTERNAL_ERROR", "Failed to fetch ratings", addCorsHeaders());
    }
}

// OPTIONS for CORS
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: addCorsHeaders(),
    });
}
