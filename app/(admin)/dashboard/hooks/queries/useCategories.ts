import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../lib/api-client"

// A Query = READING data from the server

export function useCategories(restaurantId: string) {
  return useQuery({
    queryKey: ['categories', restaurantId],
    queryFn: () => apiClient.getCategories(restaurantId),
  })
}