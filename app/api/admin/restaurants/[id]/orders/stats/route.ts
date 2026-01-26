import { createSuccessResponse, handleApiError } from "@/lib/api-error";
import { addCorsHeaders, handleOptions } from "@/lib/cors";
import { prisma } from "@/lib/prsima-simple";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: restaurantId } = await params;
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalOrders, pendingOrders, todayOrders] = await Promise.all([
      prisma.order.count({
        where: { restaurantId: restaurantId },
      }),
      prisma.order.count({
        where: {
          restaurantId: restaurantId,
          status: "PENDING",
        },
      }),
      prisma.order.findMany({
        where: {
          restaurantId: restaurantId,
          completedAt: {
            gte: today,
          },
          status: "COMPLETED",
        },
        select: {
          total: true,
        },
      }),
    ]);

    const revenueToday = todayOrders.reduce(
      (sum, order) => sum + Number(order.total),
      0,
    );
    const completedToday = todayOrders.length;
    const averageOrderValue =
      completedToday > 0 ? revenueToday / completedToday : 0;

    return createSuccessResponse(
      {
        totalOrders,
        pendingOrders,
        completedToday,
        revenueToday,
        averageOrderValue,
      },
      200,
      addCorsHeaders(),
    );
  } catch (error) {
    console.error("Error fetching order stats:", error);
    return handleApiError(error, addCorsHeaders());
  }
}
