import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../../lib/api-client"

export function useStoryCards(restaurantId: string) {
  return useQuery({
    queryKey: ['storyCards', restaurantId],
    queryFn: () => apiClient.getStoryCards(restaurantId),
  })
}
