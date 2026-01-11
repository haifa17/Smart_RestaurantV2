
export type MenuItem = {
  id: string
  restaurantId: string
  categoryId: string
  nameAr: string
  nameFr: string
  descriptionAr: string
  descriptionFr: string
  price: number
  image: string | null
  available: boolean
  isActive: boolean
  deletedAt: string | null
  createdAt: string
  updatedAt: string
}
