import { BaseModel } from "./base";

export interface MenuItem extends BaseModel {
  restaurantId: string;
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
  updatedAt?: string;
}