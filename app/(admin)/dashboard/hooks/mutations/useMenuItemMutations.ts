import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import { toast } from "react-toastify";

export function useMenuItemMutations(restaurantId: string) {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ["menuItems", restaurantId] });
    apiClient.revalidateCache(`menu-${restaurantId}`);
  };

  const createMenuItem = useMutation({
    mutationFn: (data: {
      categoryId: string;
      name: string;
      description?: string;
      price: number;
      image?: string | null;
      available?: boolean;
      isActive?: boolean;
    }) => apiClient.createMenuItem({ restaurantId, ...data }),
    onSuccess: () => {
      invalidateCache();
      toast.success("Menu item added successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add menu item: ${error.message}`);
    },
  });

  const updateMenuItem = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        categoryId?: string;
        name?: string;
        description?: string;
        price?: number;
        image?: string | null;
        available?: boolean;
      };
    }) => apiClient.updateMenuItem(id, data),
    onSuccess: () => {
      invalidateCache();
      toast.success("Menu item updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update menu item: ${error.message}`);
    },
  });

  const deleteMenuItem = useMutation({
    mutationFn: (id: string) => apiClient.deleteMenuItem(id),
    onSuccess: () => {
      invalidateCache();
      toast.success("Menu item deleted successfully");
    },
    onError: (error: Error) => {
      toast(`Failed to delete menu item: ${error.message}`);
    },
  });

  return {
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
}
