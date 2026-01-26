import { useQuery } from "@tanstack/react-query";
import { Order } from "@/lib/models/order";

export function useOrders(id: string) {
  return useQuery<Order[]>({
    queryKey: ["orders", id],
    queryFn: async () => {
      const res = await fetch(`/api/admin/restaurants/${id}/orders`);
      if (!res.ok) throw new Error("Failed to fetch orders");
      const json = await res.json();
      return Array.isArray(json.data) ? json.data : [];
    },
  });
}

export function useOrder(id: string, orderId: string) {
  return useQuery<Order>({
    queryKey: ["orders", id, orderId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/restaurants/${id}/orders/${orderId}`);
      if (!res.ok) throw new Error("Failed to fetch order");
      const json = await res.json();
      return json.data; // single object
    },
    enabled: !!orderId,
  });
}
