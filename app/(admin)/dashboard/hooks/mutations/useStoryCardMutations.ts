import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import { toast } from "react-toastify";

export function useStoryCardMutations(restaurantId: string) {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ["storyCards", restaurantId] });
    apiClient.revalidateCache(`menu-${restaurantId}`);
  };

  const createStoryCard = useMutation({
    mutationFn: (data: {
      title: string;
      subtitle: string;
      image?: string | null;
      visible?: boolean;
    }) => apiClient.createStoryCard({ restaurantId, ...data }),
    onSuccess: () => {
      invalidateCache();
      toast.success("Story card added successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add story card: ${error.message}`);
    },
  });

  const updateStoryCard = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        subtitle: string;
        image?: string | null;
        visible?: boolean;
      };
    }) => apiClient.updateStoryCard(id, data),
    onSuccess: () => {
      invalidateCache();
      toast.success("Story card updated successfully");
    },
    onError: (error: Error) => {
      toast.success(`Failed to update story card: ${error.message}`);
    },
  });

  const deleteStoryCard = useMutation({
    mutationFn: (id: string) => apiClient.deleteStoryCard(id),
    onSuccess: () => {
      invalidateCache();
      toast.success("Story card deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete story card: ${error.message}`);
    },
  });

  return {
    createStoryCard,
    updateStoryCard,
    deleteStoryCard,
  };
}
