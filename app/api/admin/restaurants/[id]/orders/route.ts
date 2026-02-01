// app/api/restaurants/[restaurantId]/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prsima-simple";
import { auth } from "@clerk/nextjs/server";
import { addCorsHeaders, handleOptions } from "@/lib/cors";
import { createSuccessResponse, handleApiError } from "@/lib/api-error";

export async function OPTIONS() {
  return handleOptions();
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      where: {
        restaurantId: id,
      },
      include: {
        items: true,
        customer: true,
        statusHistory: {
          orderBy: {
            createdAt: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return createSuccessResponse(orders, 200, addCorsHeaders());
  } catch (error) {
    console.error("Error fetching orders:", error);
    return handleApiError(error, addCorsHeaders());
  }
}

// POST /api/admin/restaurants/[restaurantId]/orders
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Generate order number
    const today = new Date();
    const dateStr = today.toISOString().split("T")[0].replace(/-/g, "");
    const orderCount = await prisma.order.count({
      where: {
        restaurantId: id,
        createdAt: {
          gte: new Date(today.setHours(0, 0, 0, 0)),
        },
      },
    });
    const orderNumber = `ORD-${dateStr}-${String(orderCount + 1).padStart(3, "0")}`;

    // Create order with items
    const order = await prisma.order.create({
      data: {
        orderNumber,
        restaurantId: id,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        type: data.type,
        status: "PENDING",
        tableNumber: data.tableNumber,
        subtotal: data.subtotal,
        tax: data.tax,
        discount: data.discount,
        total: data.total,
        notes: data.notes,
        items: {
          create: data.items.map((item: any) => ({
            menuItemId: item.menuItemId,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            notes: item.notes,
          })),
        },
        statusHistory: {
          create: {
            status: "PENDING",
            notes: "Order created",
            changedBy: userId,
          },
        },
      },
      include: {
        items: true,
      },
    });

    return createSuccessResponse(order, 200, addCorsHeaders());
  } catch (error) {
    console.error("Error creating order:", error);
    return handleApiError(error, addCorsHeaders());
  }
}
