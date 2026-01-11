import { Category } from "./category"
import { MenuItem } from "./menuItem"
import { Restaurant } from "./restaurant"
import { StoryCard } from "./story"

export interface MenuData {
  restaurant: Restaurant
  categories: Category[]
  menuItems: MenuItem[]
  storyCards: StoryCard[]
}