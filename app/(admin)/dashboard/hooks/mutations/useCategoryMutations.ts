import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import { toast } from "react-toastify";

// A Mutation = CHANGING data on the server
// Mutations NEVER update queries automatically: thats why we use invalidateQueries
export function useCategoryMutations(restaurantId: string) {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ["categories", restaurantId] });
    apiClient.revalidateCache(`menu-${restaurantId}`);
  };

  const createCategory = useMutation({
    mutationFn: (data: { nameEn?: string; nameFr?: string; nameAr?: string }) =>
      apiClient.createCategory({
        restaurantId,
        ...data,
        visible: true,
      }),
    onSuccess: () => {
      invalidateCache();
      toast.success("Catégorie ajoutée avec succès");
    },
    onError: (error: Error) => {
      toast.error(`Impossible d'ajouter la catégorie: ${error.message}`);
    },
  });

  const updateCategory = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: {
        nameEn?: string;
        nameFr?: string;
        nameAr?: string;
        visible?: boolean;
        order?: number;
      };
    }) => apiClient.updateCategory(id, data),
    onSuccess: () => {
      invalidateCache();
      toast.success("Catégorie mise à jour avec succès");
    },
    onError: (error: Error) => {
      toast.error(`Échec de la mise à jour de la catégorie: ${error.message}`);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => apiClient.deleteCategory(id),
    onSuccess: () => {
      invalidateCache();
      queryClient.invalidateQueries({ queryKey: ["menuItems", restaurantId] });
      toast.success("Catégorie supprimée avec succès");
    },
    onError: (error: Error) => {
      toast.error(`Échec de la suppression de la catégorie: ${error.message}`);
    },
  });

  const reorderCategories = useMutation({
    mutationFn: (categories: Array<{ id: string; order: number }>) =>
      apiClient.reorderCategories(categories),
    onSuccess: () => {
      invalidateCache();
    },
    onError: (error: Error) => {
      toast.error(`Impossible de réorganiser les catégories: ${error.message}`);
    },
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
  };
}
