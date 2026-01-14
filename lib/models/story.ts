import { BaseModel } from "./base"

export interface StoryCard extends BaseModel {
  restaurantId: string
  title: string
  subtitle: string
  image?: string | null
  visible?: boolean
  order?: number
  isActive?: boolean
}