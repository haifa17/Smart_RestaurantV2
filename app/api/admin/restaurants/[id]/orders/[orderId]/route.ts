import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prsima-simple";
import { addCorsHeaders, handleOptions } from "@/lib/cors";
import { createSuccessResponse, handleApiError } from "@/lib/api-error";
// OPTIONS / CORS preflight
export async function OPTIONS() {
  return handleOptions();
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; orderId: string }> },
) {
  try {
    const { id, orderId } = await params;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    // Build update data
    const updateData: any = {};
    if (data.status) {
      updateData.status = data.status;

      // Add timestamp fields based on status
      if (data.status === "CONFIRMED") {
        updateData.confirmedAt = new Date();
      } else if (data.status === "COMPLETED") {
        updateData.completedAt = new Date();
        updateData.isPaid = true; // Auto-mark as paid when completed
        updateData.paidAt = new Date();
      } else if (data.status === "CANCELLED") {
        updateData.cancelledAt = new Date();
      }
    }

    if (data.tableNumber !== undefined)
      updateData.tableNumber = data.tableNumber;
    if (data.notes !== undefined) updateData.notes = data.notes;
    if (data.adminNotes !== undefined) updateData.adminNotes = data.adminNotes;
    if (data.isPaid !== undefined) {
      updateData.isPaid = data.isPaid;
      if (data.isPaid && !data.paidAt) {
        updateData.paidAt = new Date();
      }
    }

    const order = await prisma.order.update({
      where: {
        id: orderId,
        // restaurantId: id,
      },
      data: updateData,
      include: {
        items: true,
      },
    });

    // Create status history entry if status changed
    if (data.status) {
      await prisma.orderStatusHistory.create({
        data: {
          orderId: orderId,
          status: data.status,
          changedBy: userId,
          notes: data.statusNotes,
        },
      });
    }

    return createSuccessResponse(order, 200, addCorsHeaders());
  } catch (error) {
    console.error("Error updating order:", error);
    return handleApiError(error, addCorsHeaders());
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; orderId: string }> },
) {
  try {
    const { id, orderId } = await params;

    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.order.delete({
      where: {
        id: orderId,
        restaurantId: id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Failed to delete order" },
      { status: 500 },
    );
  }
}
