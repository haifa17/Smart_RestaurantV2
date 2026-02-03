import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { createSuccessResponse, createErrorResponse, ApiError } from "@/lib/api-error";
import { addCorsHeaders } from "@/lib/cors";

// PATCH /api/admin/ratings/[id] - Update rating (approve/hide)
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: ratingId } = await params;
        const body = await request.json();

        const { isApproved, isPublic } = body;

        const rating = await prisma.rating.update({
            where: { id: ratingId },
            data: {
                ...(typeof isApproved === "boolean" && { isApproved }),
                ...(typeof isPublic === "boolean" && { isPublic }),
            },
        });

        return createSuccessResponse(rating, 200, addCorsHeaders());
    } catch (error) {
        console.error("[Admin Ratings API] Error:", error);
        if (error instanceof ApiError) {
            return createErrorResponse(error.statusCode, error.code, error.message, addCorsHeaders());
        }
        return createErrorResponse(500, "INTERNAL_ERROR", "Failed to update rating", addCorsHeaders());
    }
}

// DELETE /api/admin/ratings/[id] - Delete a rating
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: ratingId } = await params;

        await prisma.rating.delete({
            where: { id: ratingId },
        });

        return createSuccessResponse({ success: true }, 200, addCorsHeaders());
    } catch (error) {
        console.error("[Admin Ratings API] Error:", error);
        if (error instanceof ApiError) {
            return createErrorResponse(error.statusCode, error.code, error.message, addCorsHeaders());
        }
        return createErrorResponse(500, "INTERNAL_ERROR", "Failed to delete rating", addCorsHeaders());
    }
}

// OPTIONS for CORS
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: addCorsHeaders(),
    });
}
