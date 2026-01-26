import { useQuery } from "@tanstack/react-query";

export interface OrderStats {
  totalOrders: number;
  pendingOrders: number;
  completedToday: number;
  revenueToday: number;
  averageOrderValue: number;
}

export function useOrderStats(id: string) {
  return useQuery<OrderStats>({
    queryKey: ["order-stats", id],
    queryFn: async () => {
      const res = await fetch(
        `/api/admin/restaurants/${id}/orders/stats`,
      );
      if (!res.ok) throw new Error("Failed to fetch order stats");
      const json = await res.json();
      // unwrap the 'data' property and provide a fallback
      return (
        json.data ?? {
          totalOrders: 0,
          pendingOrders: 0,
          completedToday: 0,
          revenueToday: 0,
          averageOrderValue: 0,
        }
      );
    },
  });
}
