import { BaseModel } from "./base";

export interface MenuItem extends BaseModel {
  restaurantId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  image: string | null;
  available: boolean;
  isActive?: boolean;
}
