export type StoryCard = {
  id: string
  restaurantId: string
  titleAr: string
  titleFr: string
  subtitleAr: string
  subtitleFr: string
  image: string | null
  visible: boolean
  order: number
  isActive: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}