import { BaseModel } from "./base"

export interface Category extends BaseModel {
  restaurantId: string
  name: string;
  visible: boolean
  order: number
  isActive: boolean
}