import { BaseModel } from "./base"

export interface Category extends BaseModel {
  restaurantId: string;
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
  icon?: string;
  visible: boolean;
  order: number;
  isActive: boolean;
}
