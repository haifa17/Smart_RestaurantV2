
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../lib/api-client"

export function useMenuItems(restaurantId: string) {
  return useQuery({
    queryKey: ['menuItems', restaurantId],
    queryFn: () => apiClient.getMenuItems(restaurantId),
  })
}