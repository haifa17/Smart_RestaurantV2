import type {
    Restaurant as RestaurantModel,
} from '@/lib/models/restaurant'
import type { Restaurant, Schedule} from '@prisma/client'

export function transformRestaurant(
  restaurant: Restaurant & { schedules: Schedule[] }
): RestaurantModel {
  return {
    id: restaurant.id,
    slug: restaurant.slug,
    name: restaurant.name,
    phone: restaurant.phone,
    logo: restaurant.logo,
    heroImage: restaurant.heroImage,
    schedules: restaurant.schedules.map(s => ({
      id: s.id,
      dayOfWeek: s.dayOfWeek,
      opensAt: s.opensAt,
      closesAt: s.closesAt,
      isClosed: s.isClosed,
    })),
    description: restaurant.description ?? undefined,
    tagline: restaurant.tagline,
    story: restaurant.story,
    isActive: restaurant.isActive,
    createdAt: restaurant.createdAt.toISOString(),
    updatedAt: restaurant.updatedAt.toISOString(),
  }
}