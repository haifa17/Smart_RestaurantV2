"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrderCard } from "../cards/OrderCard";
import { useOrders } from "../../hooks/queries/useOrders";
import { useOrderMutations } from "../../hooks/mutations/useOrderMutations";
import { useMenuItems } from "../../hooks/queries/useMenuItems";
import { Order, OrderStatus } from "@/lib/models/order";
import { OrderEditor } from "../order/order-editor";
import OrderDetailsDialog from "../order/order-details-dialog";
import OrderStatusCards from "../order/order-status";
import OrderTabs from "../order/OrderTabs";

export function OrdersPage({ restaurantId }: { restaurantId: string }) {
  const { data: orders = [], isLoading } = useOrders(restaurantId);
  const { data: menuItems = [] } = useMenuItems(restaurantId);
  const { createOrder, updateOrder, deleteOrder } =
    useOrderMutations(restaurantId);

  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "ALL">("ALL");
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Filter by active/completed
    if (activeTab === "active") {
      filtered = filtered.filter(
        (o) => o.status !== "COMPLETED" && o.status !== "CANCELLED",
      );
    } else {
      filtered = filtered.filter(
        (o) => o.status === "COMPLETED" || o.status === "CANCELLED",
      );
    }

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((o) => o.status === statusFilter);
    }

    // Sort by creation date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [orders, statusFilter, activeTab]);

  const stats = useMemo(() => {
    const pending = orders.filter((o) => o.status === "PENDING").length;
    const preparing = orders.filter(
      (o) => o.status === "PREPARING" || o.status === "CONFIRMED",
    ).length;
    const ready = orders.filter((o) => o.status === "READY").length;
    const completedToday = orders.filter(
      (o) =>
        o.status === "COMPLETED" &&
        new Date(o.completedAt!).toDateString() === new Date().toDateString(),
    ).length;

    return { pending, preparing, ready, completedToday };
  }, [orders]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Commandes</h2>
          <p className="text-muted-foreground mt-1">
            Gérez les commandes de votre restaurant
          </p>
        </div>
        <Button
          className="cursor-pointer bg-linear-to-r from-blue-500 to-blue-700 text-white flex items-center"
          onClick={() => setIsCreatingOrder(true)}
        >
          <Plus size={14} />
          Nouvelle commande
        </Button>
      </div>

      {/* Quick Stats */}
      <OrderStatusCards stats={stats} />

      {/* Tabs & Filters */}
      <OrderTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orders={orders}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Orders List */}
      {isLoading ? (
        <div>Chargement...</div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>Aucune commande trouvée</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onViewDetails={() => setSelectedOrder(order)}
              onUpdateStatus={(status) =>
                updateOrder.mutate({ id: order.id, data: { status } })
              }
              onMarkPaid={() =>
                updateOrder.mutate({
                  id: order.id,
                  data: { isPaid: true },
                })
              }
              onCancel={() =>
                updateOrder.mutate({
                  id: order.id,
                  data: { status: "CANCELLED" },
                })
              }
            />
          ))}
        </div>
      )}

      {/* Order Editor */}
      <OrderEditor
        open={isCreatingOrder}
        onClose={() => setIsCreatingOrder(false)}
        onSave={(data) => {
          createOrder.mutate(data);
          setIsCreatingOrder(false);
        }}
        menuItems={menuItems}
      />

      {/* Order Details Dialog */}
      <OrderDetailsDialog
        selectedOrder={selectedOrder!!}
        setSelectedOrder={setSelectedOrder}
      />
    </div>
  );
}
