import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import { toast } from "react-toastify";
import { MenuItemCheeseInput, MenuItemSauceInput } from "@/lib/models/menuItem";

export function useMenuItemMutations(restaurantId: string) {
  const queryClient = useQueryClient();

  const invalidateCache = () => {
    queryClient.invalidateQueries({ queryKey: ["menuItems", restaurantId] });
    apiClient.revalidateCache(`menu-${restaurantId}`);
  };

  const createMenuItem = useMutation({
    mutationFn: (data: {
      categoryId: string;
      nameEn?: string;
      nameFr?: string;
      nameAr?: string;
      descriptionEn?: string;
      descriptionFr?: string;
      descriptionAr?: string;
      price: number;
      image?: string | null;
      available?: boolean;
      isActive?: boolean;
      isChefRecommendation?: boolean;
      isPopular?: boolean;
      isSpicy?: boolean;
      isVegetarian?: boolean;
      sauces?: MenuItemSauceInput[];
      cheeses?: MenuItemCheeseInput[];
    }) => apiClient.createMenuItem({ restaurantId, ...data }),
    onSuccess: () => {
      invalidateCache();
      toast.success("Élément de menu ajouté avec succès");
    },
    onError: (error: Error) => {
      toast.error(`Impossible d'ajouter l'élément de menu : ${error.message}`);
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
        nameEn?: string;
        nameFr?: string;
        nameAr?: string;
        descriptionEn?: string;
        descriptionFr?: string;
        descriptionAr?: string;
        price?: number;
        image?: string | null;
        available?: boolean;
        isActive?: boolean;
        isChefRecommendation?: boolean;
        isPopular?: boolean;
        isSpicy?: boolean;
        isVegetarian?: boolean;
        sauces?: MenuItemSauceInput[];
        cheeses?: MenuItemCheeseInput[];
      };
    }) => apiClient.updateMenuItem(id, data),
    onSuccess: () => {
      invalidateCache();
      toast.success("Élément de menu mis à jour avec succès");
    },
    onError: (error: Error) => {
      toast.error(
        `Impossible de mettre à jour l'élément de menu : ${error.message}`,
      );
    },
  });

  const deleteMenuItem = useMutation({
    mutationFn: (id: string) => apiClient.deleteMenuItem(id),
    onSuccess: () => {
      invalidateCache();
      toast.success("Élément de menu supprimé avec succès");
    },
    onError: (error: Error) => {
      toast(`Impossible de supprimer l'élément de menu : ${error.message}`);
    },
  });

  return {
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
  };
}
