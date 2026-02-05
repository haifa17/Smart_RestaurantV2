
export interface SelectedSauce {
  sauceType: string;
  customName?: string;
  isIncluded?: boolean;
}

export interface SelectedCheese {
  cheeseType: string;
  customName?: string;
  isIncluded?: boolean;
}
export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId?: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  selectedSauces?: SelectedSauce[];
  selectedCheeses?: SelectedCheese[];
}
