"use client";

import { MenuManagement } from "../MenuManagement";
import { useCategoryMutations } from "../../hooks/mutations/useCategoryMutations";
import { useImageUpload } from "../../hooks/mutations/useImageUpload";
import { useMenuItemMutations } from "../../hooks/mutations/useMenuItemMutations";
import { useCategories } from "../../hooks/queries/useCategories";
import { useMenuItems } from "../../hooks/queries/useMenuItems";

interface MenuPageProps {
  restaurantId: string;
}

export function MenuPage({ restaurantId }: MenuPageProps) {
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories(restaurantId);
  const { data: menuItems = [], isLoading: menuItemsLoading } =
    useMenuItems(restaurantId);

  const { createCategory, updateCategory, deleteCategory, reorderCategories } =
    useCategoryMutations(restaurantId);

  const { createMenuItem, updateMenuItem, deleteMenuItem } =
    useMenuItemMutations(restaurantId);

  const uploadImage = useImageUpload();

  return (
    <MenuManagement
      categories={categories}
      menuItems={menuItems}
      isLoading={categoriesLoading || menuItemsLoading}
      onCreateCategory={(data) => createCategory.mutate(data)}
      onUpdateCategory={(id, data) => updateCategory.mutate({ id, data })}
      onDeleteCategory={(id) => deleteCategory.mutate(id)}
      onReorderCategories={(categories) => reorderCategories.mutate(categories)}
      onCreateMenuItem={(data) => createMenuItem.mutate(data)}
      onUpdateMenuItem={(id, data) => updateMenuItem.mutate({ id, data })}
      onDeleteMenuItem={(id) => deleteMenuItem.mutate(id)}
      onUploadImage={(file, folder) =>
        uploadImage.mutateAsync({ file, folder })
      }
    />
  );
}
