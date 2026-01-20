"use client";

import { useImageUpload } from "../../hooks/mutations/useImageUpload";
import { useMenuItemMutations } from "../../hooks/mutations/useMenuItemMutations";
import { useCategories } from "../../hooks/queries/useCategories";
import { useMenuItems } from "../../hooks/queries/useMenuItems";
import { MenuItemsManagement } from "../menu/MenuItemsManagement";

interface MenuPageProps {
  restaurantId: string;
}
export function MenuPage({ restaurantId }: MenuPageProps) {
  const { data: categories = [] } = useCategories(restaurantId);
  const { data: menuItems = [] } = useMenuItems(restaurantId);

  const { createMenuItem, updateMenuItem, deleteMenuItem } =
    useMenuItemMutations(restaurantId);

  const uploadImage = useImageUpload();

  return (
    <MenuItemsManagement
      restaurantId={restaurantId}
      categories={categories}
      menuItems={menuItems}
      onCreate={createMenuItem.mutate}
      onUpdate={(id, data) =>
        updateMenuItem.mutate({ id, data })
      }
      onDelete={(id) => deleteMenuItem.mutate(id)}
      onUploadImage={(file) =>
        uploadImage.mutateAsync({ file, folder: "menu-items" })
      }
    />
  );
}