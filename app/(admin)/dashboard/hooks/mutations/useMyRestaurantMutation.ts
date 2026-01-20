import { useQuery } from "@tanstack/react-query";
import { fetchMyRestaurant } from "../queries/useMyRestaurant";

export function useMyRestaurant() {
    return useQuery({
        queryKey: ["myRestaurant"],
        queryFn: fetchMyRestaurant,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
}
