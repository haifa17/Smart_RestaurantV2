import { NextRequest } from "next/server";
import { prisma } from "@/lib/prsima-simple";
import { createSuccessResponse, handleApiError } from "@/lib/api-error";
import { addCorsHeaders } from "@/lib/cors";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function POST(
  req: NextRequest,
  { params }: PageProps
) {
  try {
    const { slug } = await params;
    const data = await req.json();

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

    // 2️⃣ Generate order number (daily)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const dateStr = startOfDay.toISOString().split("T")[0].replace(/-/g, "");

    const orderCount = await prisma.order.count({
      where: {
        restaurantId: restaurant.id,
        createdAt: {
          gte: startOfDay,
        },
      },
    });

    const orderNumber = `ORD-${dateStr}-${String(orderCount + 1).padStart(3, "0")}`;

    // 3️⃣ Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        restaurantId: restaurant.id,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        type: data.type, // DINE_IN | TAKEAWAY | DELIVERY
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
            notes: "Order created from public menu",
            changedBy: "PUBLIC",
          },
        },
      },
      include: {
        items: true,
      },
    });

    return createSuccessResponse(order, 201, addCorsHeaders());
  } catch (error) {
    console.error("Public order error:", error);
    return handleApiError(error, addCorsHeaders());
  }
}
