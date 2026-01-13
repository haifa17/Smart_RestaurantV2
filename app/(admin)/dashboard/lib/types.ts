export interface CategoryFormData {
  name: string;
}

export interface MenuItemFormData {
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image?: string | null;
  available?: boolean;
}

export type DeleteConfirmState = {
  type: "category" | "item";
  id: string;
} | null;
