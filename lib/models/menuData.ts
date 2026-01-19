import { Category } from "./category"
import { MenuItem } from "./menuItem"
import { Restaurant } from "./restaurant"

export interface MenuData {
  restaurant: Restaurant
  categories: Category[]
  menuItems: MenuItem[]
}