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
}

export const OPTIONS = handleOptions;

export async function POST(req: NextRequest, { params }: PageProps) {
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
        addCorsHeaders(),
      );
    }

    // 2️⃣ Create order with retry logic for race conditions
    const maxRetries = 5;
    let order;

    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const now = new Date();
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        const dateStr = startOfDay.toISOString().split("T")[0].replace(/-/g, "");

        // Use transaction to ensure atomicity
        order = await prisma.$transaction(async (tx) => {
          // Count within transaction for consistency
          const orderCount = await tx.order.count({
            where: {
              restaurantId: restaurant.id,
              createdAt: {
                gte: startOfDay,
              },
            },
          });

          const orderNumber = `ORD-${dateStr}-${String(orderCount + 1).padStart(3, "0")}`;

          // Create order with all related data
          return await tx.order.create({
            data: {
              orderNumber,
              restaurantId: restaurant.id,
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
                create: data.items.map((item: OrderItemInput) => ({
                  menuItemId: item.menuItemId,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  notes: item.notes,
                  selectedSauces: item.selectedSauces || [],
                  selectedCheeses: item.selectedCheeses || [],
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
        });

        // ✅ Success - break out of retry loop
        break;

      } catch (error: any) {
        // Check if it's a unique constraint violation (duplicate orderNumber)
        const isDuplicateError = error.code === 'P2002';
        const hasRetriesLeft = attempt < maxRetries - 1;

        if (isDuplicateError && hasRetriesLeft) {
          // Log the retry attempt
          console.log(`Order number collision detected, retrying... (attempt ${attempt + 1}/${maxRetries})`);
          
          // Exponential backoff: wait longer with each retry
          await new Promise(resolve => setTimeout(resolve, 50 * (attempt + 1)));
          
          // Continue to next iteration
          continue;
        }

        // If it's not a duplicate error, or we're out of retries, throw it
        throw error;
      }
    }

    // Safety check: ensure order was created
    if (!order) {
      throw new Error("Failed to create order after multiple attempts");
    }

    return createSuccessResponse(order, 201, addCorsHeaders());

  } catch (error) {
    console.error("Public order error:", error);
    return handleApiError(error, addCorsHeaders());
  }
}