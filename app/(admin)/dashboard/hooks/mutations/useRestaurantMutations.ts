import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import { toast } from "react-toastify";
import { Schedule } from "@/lib/models/schedule";

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
      schedules?: Schedule[];
      menuBaseUrl?: string;
    }) => apiClient.updateRestaurant(restaurantId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["restaurant", restaurantId] });
      apiClient.revalidateCache(`menu-${restaurantId}`);
      toast.success(
        "Les informations sur le restaurant ont été mises à jour avec succès",
      );
    },
    onError: (error: Error) => {
      toast.error(
        `Impossible de mettre à jour les informations du restaurant: ${error.message}`,
      );
    },
  });

  return { updateRestaurant };
}
