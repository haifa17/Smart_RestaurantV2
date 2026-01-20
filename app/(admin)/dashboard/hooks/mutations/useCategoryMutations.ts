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
      toast.success("Category added successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to add category: ${error.message}`);
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
      toast.success("Category updated successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to update category: ${error.message}`);
    },
  });

  const deleteCategory = useMutation({
    mutationFn: (id: string) => apiClient.deleteCategory(id),
    onSuccess: () => {
      invalidateCache();
      queryClient.invalidateQueries({ queryKey: ["menuItems", restaurantId] });
      toast.success("Category deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(`Failed to delete category: ${error.message}`);
    },
  });

  const reorderCategories = useMutation({
    mutationFn: (categories: Array<{ id: string; order: number }>) =>
      apiClient.reorderCategories(categories),
    onSuccess: () => {
      invalidateCache();
    },
    onError: (error: Error) => {
      toast.error(`Failed to reorder categories: ${error.message}`);
    },
  });

  return {
    createCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
  };
}
