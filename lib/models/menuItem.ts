import { CheeseType, SauceType } from "../ennum";
import { BaseModel } from "./base";

export interface MenuItemSauce extends BaseModel {
  menuItemId: string;
  sauceType: SauceType;
  customName?: string; // Required when sauceType is OTHER
  isIncluded?: boolean;
  extraCost?: number;
}
export interface MenuItemSauceInput {
  // No menuItemId, no id, no createdAt, no updatedAt
  sauceType: SauceType;
  customName?: string;
  isIncluded?: boolean;
  extraCost?: number;
}
export interface MenuItemCheese extends BaseModel {
  menuItemId: string;
  cheeseType: CheeseType;
  customName?: string; // Required when cheeseType is OTHER
  isIncluded?: boolean;
  extraCost?: number;
}
export interface MenuItemCheeseInput {
  // No menuItemId, no id, no createdAt, no updatedAt
  cheeseType: CheeseType;
  customName?: string;
  isIncluded?: boolean;
  extraCost?: number;
}
export interface MenuItemSupplement extends BaseModel {
  menuItemId: string;
  name: string;
  category: string;
  price: number;
  isAvailable: boolean;
  updatedAt?: string;
}

// Input type for creating/updating supplements (without id)
export interface MenuItemSupplementInput {
  name: string;
  category: string;
  price: number;
  isAvailable: boolean;
}
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
  sauces?: MenuItemSauce[];
  cheeses?: MenuItemCheese[];
  supplements?: MenuItemSupplement[];
}
export interface MenuItemInput extends Omit<MenuItem, 'id' | 'sauces' | 'cheeses' | 'supplements'> {
  sauces?: MenuItemSauceInput[];
  cheeses?: MenuItemCheeseInput[];
  supplements?: MenuItemSupplementInput[]; // ← NEW FIELD
}
