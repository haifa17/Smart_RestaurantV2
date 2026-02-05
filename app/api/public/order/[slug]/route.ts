import { NextRequest } from "next/server";
import { prisma } from "@/lib/prsima-simple";
import { createSuccessResponse, handleApiError } from "@/lib/api-error";
import { addCorsHeaders, handleOptions } from "@/lib/cors";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface OrderItemInput {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  selectedSauces?: Array<{
    sauceType: string;
    customName?: string;
  }>;
  selectedCheeses?: Array<{
    cheeseType: string;
    customName?: string;
  }>;
  selectedSupplements?: Array<{
    supplementType: string;
    customName?: string;
    quantity: number;
    price: number;
  }>;
}

export const OPTIONS = handleOptions;

export async function POST(req: NextRequest, { params }: PageProps) {
  try {
    const { slug } = await params;
    const data = await req.json();

    // 1️⃣ Find restaurant
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
        addCorsHeaders(),
      );
    }

    // 2️⃣ Create order safely using DB id
    const order = await prisma.$transaction(async (tx) => {
      // Create order WITHOUT orderNumber
      const createdOrder = await tx.order.create({
        data: {
          restaurantId: restaurant.id,
          customerName: data.customerName,
          customerPhone: data.customerPhone,
          customerAddress: data.customerAddress,
          type: data.type,
          status: "PENDING",
          tableNumber: data.tableNumber,
          subtotal: data.subtotal,
          tax: data.tax,
          discount: data.discount,
          total: data.total,
          notes: data.notes,

          items: {
            create: data.items.map((item: OrderItemInput) => ({
              menuItemId: item.menuItemId,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              notes: item.notes,
              selectedSauces: item.selectedSauces || [],
              selectedCheeses: item.selectedCheeses || [],
              selectedSupplements: item.selectedSupplements || [],
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

      // Generate UNIQUE orderNumber from DB id
      const dateStr = new Date().toISOString().split("T")[0].replace(/-/g, "");

      const orderNumber = `ORD-${dateStr}-${String(createdOrder.id).padStart(
        6,
        "0",
      )}`;

      // Update order with orderNumber
      return await tx.order.update({
        where: { id: createdOrder.id },
        data: { orderNumber },
        include: { items: true },
      });
    });

    return createSuccessResponse(order, 201, addCorsHeaders());
  } catch (error) {
    console.error("Public order error:", error);
    return handleApiError(error, addCorsHeaders());
  }
}
