import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import { toast } from "react-toastify";

export function useRestaurantMutations(restaurantId: string) {
  const queryClient = useQueryClient();

  const updateRestaurant = useMutation({
    mutationFn: (data: {
      name?: string;
      phone?: string | null;
      logo?: string | null;
      heroImage?: string | null;
      tagline?: string | null;
      story?: string | null;
    }) => apiClient.updateRestaurant(restaurantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant", restaurantId] });
      apiClient.revalidateCache(`menu-${restaurantId}`);
      toast.success("Restaurant info updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update restaurant info: ${error.message}`);
    },
  });

  return { updateRestaurant };
}
