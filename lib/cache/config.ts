/**
 * Cache configuration constants
 */
export const CACHE_CONFIG = {
  MENU_REVALIDATE: 3600, // 1 hour
  MENU_TAG_PREFIX: 'menu-',
} as const

/**
 * Generate cache key for menu data
 */
export function getMenuCacheKey(restaurantSlug: string): string {
  return `menu-data-${restaurantSlug}`
}

/**
 * Generate cache tag for restaurant menu
 */
export function getMenuCacheTag(restaurantId: string): string {
  return `${CACHE_CONFIG.MENU_TAG_PREFIX}${restaurantId}`
}

