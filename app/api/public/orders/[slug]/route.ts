import { NextRequest } from "next/server";
import { prisma } from "@/lib/prsima-simple";
import { createSuccessResponse, handleApiError, ApiError } from "@/lib/api-error";
import { addCorsHeaders, handleOptions } from "@/lib/cors";
import { z } from "zod";

// Schema for order creation (compatible with smart-menu)
const orderItemSchema = z.object({
    menuItemId: z.string(),
    quantity: z.number().int().positive(),
    unitPrice: z.number().optional(),
    notes: z.string().optional(),
});

const createOrderSchema = z.object({
    customerName: z.string().min(1, "Customer name is required"),
    customerPhone: z.string().min(1, "Phone number is required"),
    customerEmail: z.string().email().optional().or(z.literal("")),
    tableNumber: z.string().optional(),
    orderType: z.enum(["DINE_IN", "TAKEAWAY", "DELIVERY"]).default("DINE_IN"),
    notes: z.string().optional(),
    deliveryAddress: z.string().optional(),
    items: z.array(orderItemSchema).min(1, "At least one item is required"),
});

interface RouteParams {
    params: Promise<{ slug: string }>;
}

// CORS preflight
export const OPTIONS = handleOptions;

// Generate order number
async function generateOrderNumber(restaurantId: string): Promise<string> {
    const today = new Date();
    const datePrefix = today.toISOString().slice(0, 10).replace(/-/g, "");

    // Count orders for this restaurant today
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const orderCount = await prisma.order.count({
        where: {
            restaurantId,
            createdAt: {
                gte: startOfDay,
                lte: endOfDay,
            },
        },
    });

    const orderNum = (orderCount + 1).toString().padStart(3, "0");
    return `ORD-${datePrefix}-${orderNum}`;
}

// POST /api/public/orders/[slug] - Create a new order
export async function POST(req: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;
        const body = await req.json();
        const data = createOrderSchema.parse(body);

        console.log("[Orders API - Public] Slug:", slug, "Creating order...");

        // Find restaurant by slug
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                slug,
                isActive: true,
            },
            select: { id: true, name: true },
        });

        console.log("[Orders API - Public] Restaurant found:", restaurant);

        if (!restaurant) {
            return createSuccessResponse(
                { message: "Restaurant not found" },
                404,
                addCorsHeaders()
            );
        }

        // Validate menu items exist and are available
        const menuItemIds = data.items.map((item) => item.menuItemId);
        const menuItems = await prisma.menuItem.findMany({
            where: {
                id: { in: menuItemIds },
                restaurantId: restaurant.id,
                available: true,
                isActive: true,
            },
            select: {
                id: true,
                nameEn: true,
                nameFr: true,
                price: true,
            },
        });

        if (menuItems.length !== menuItemIds.length) {
            throw new ApiError(400, "INVALID_ITEMS", "Some menu items are not available");
        }

        // Create a map of menu items for quick lookup
        const menuItemMap = new Map(menuItems.map((item) => [item.id, item]));

        // Calculate totals in EUR (using regular numbers)
        let subtotal = 0;
        const orderItems = data.items.map((item) => {
            const menuItem = menuItemMap.get(item.menuItemId)!;
            const price = Number(menuItem.price);
            const lineTotal = price * item.quantity;
            subtotal += lineTotal;

            return {
                menuItemId: item.menuItemId,
                name: menuItem.nameEn || menuItem.nameFr || "Item",
                price: price,
                quantity: item.quantity,
                notes: item.notes,
            };
        });

        // Calculate tax (20% TVA for France)
        const taxRate = 0.20;
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        // Generate unique order number
        const orderNumber = await generateOrderNumber(restaurant.id);

        // Map orderType to type (V2 uses 'type' instead of 'orderType')
        const orderType = data.orderType === "DELIVERY" ? "TAKEAWAY" : data.orderType;

        // Create order with items
        const order = await prisma.order.create({
            data: {
                orderNumber,
                restaurantId: restaurant.id,
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                type: orderType as "DINE_IN" | "TAKEAWAY",
                tableNumber: data.tableNumber,
                notes: data.notes,
                subtotal,
                tax,
                discount: 0,
                total,
                items: {
                    create: orderItems,
                },
                statusHistory: {
                    create: {
                        status: "PENDING",
                        notes: "Order created from public menu",
                        changedBy: "CUSTOMER",
                    },
                },
            },
            include: {
                items: true,
            },
        });

        console.log("[Orders API - Public] Order created:", {
            id: order.id,
            orderNumber: order.orderNumber,
            restaurantId: order.restaurantId,
        });

        return createSuccessResponse(
            {
                orderNumber: order.orderNumber,
                status: order.status,
                total: Number(order.total),
                currency: "EUR",
                estimatedTime: "15-30 minutes",
            },
            201,
            addCorsHeaders()
        );
    } catch (error) {
        console.error("[Orders API - Public] Error:", error);
        return handleApiError(error, addCorsHeaders());
    }
}

// GET /api/public/orders/[slug]?orderNumber=XXX&phone=XXX - Check order status
export async function GET(req: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params;
        const { searchParams } = new URL(req.url);
        const orderNumber = searchParams.get("orderNumber");
        const phone = searchParams.get("phone");

        if (!orderNumber || !phone) {
            throw new ApiError(400, "MISSING_PARAMS", "Order number and phone are required");
        }

        // Find restaurant by slug
        const restaurant = await prisma.restaurant.findFirst({
            where: {
                slug,
                isActive: true,
            },
            select: { id: true },
        });

        if (!restaurant) {
            return createSuccessResponse(
                { message: "Restaurant not found" },
                404,
                addCorsHeaders()
            );
        }

        // Find order
        const order = await prisma.order.findFirst({
            where: {
                orderNumber,
                customerPhone: phone,
                restaurantId: restaurant.id,
            },
            include: {
                items: true,
            },
        });

        if (!order) {
            return createSuccessResponse(
                { message: "Order not found" },
                404,
                addCorsHeaders()
            );
        }

        return createSuccessResponse(
            {
                orderNumber: order.orderNumber,
                status: order.status,
                paymentStatus: order.isPaid ? "PAID" : "PENDING",
                items: order.items.map((item) => ({
                    name: item.name,
                    quantity: item.quantity,
                    unitPrice: Number(item.price),
                    total: Number(item.price) * item.quantity,
                })),
                subtotal: Number(order.subtotal),
                tax: Number(order.tax),
                total: Number(order.total),
                createdAt: order.createdAt.toISOString(),
            },
            200,
            addCorsHeaders()
        );
    } catch (error) {
        return handleApiError(error, addCorsHeaders());
    }
}
