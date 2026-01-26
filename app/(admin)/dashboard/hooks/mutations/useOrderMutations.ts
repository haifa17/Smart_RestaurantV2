import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateOrderData, UpdateOrderData } from "@/lib/models/order";
import { toast } from "react-toastify";

export function useOrderMutations(id: string) {
  const queryClient = useQueryClient();

  const createOrder = useMutation({
    mutationFn: async (data: CreateOrderData) => {
      const res = await fetch(`/api/admin/restaurants/${id}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create order");
      const json = await res.json();
      return json.data; // unwrap the 'data' property
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      queryClient.invalidateQueries({
        queryKey: ["order-stats", id],
      });
      toast.success("Commande créée avec succès");
    },
    onError: (error) => {
      toast.error("Échec de la création de la commande");
      console.error(error);
    },
  });

  const updateOrder = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateOrderData }) => {
      const res = await fetch(
        `/api/admin/restaurants/${id}/orders/${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) throw new Error("Failed to update order");
      const json = await res.json();
      return json.data; // unwrap
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      queryClient.invalidateQueries({
        queryKey: ["order-stats", id],
      });
      toast.success("Commande mise à jour");
    },
    onError: (error) => {
      toast.error("Échec de la mise à jour");
      console.error(error);
    },
  });

  const deleteOrder = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `/api/admin/restaurants/${id}/orders/${id}`,
        {
          method: "DELETE",
        },
      );
      if (!res.ok) throw new Error("Failed to delete order");
      const json = await res.json();
      return json.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders", id] });
      queryClient.invalidateQueries({
        queryKey: ["order-stats", id],
      });
      toast.success("Commande supprimée");
    },
    onError: (error) => {
      toast.error("Échec de la suppression");
      console.error(error);
    },
  });

  return {
    createOrder,
    updateOrder,
    deleteOrder,
  };
}
