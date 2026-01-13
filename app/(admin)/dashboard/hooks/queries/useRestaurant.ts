import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../lib/api-client"

export function useRestaurant(restaurantId: string) {
  return useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => apiClient.getRestaurant(restaurantId),
  })
}