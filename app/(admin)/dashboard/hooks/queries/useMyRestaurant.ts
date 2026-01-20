import { useQuery } from "@tanstack/react-query";

interface RestaurantData {
    restaurantId: string;
    name: string;
    slug: string;
}

async function fetchMyRestaurant(): Promise<RestaurantData> {
    const response = await fetch("/api/admin/restaurants/me");

    if (!response.ok) {
        throw new Error(`Failed to fetch restaurant: ${response.status}`);
    }

    const data = await response.json();

    if (!data?.data?.restaurantId) {
        throw new Error("No restaurantId in response");
    }

    return data.data;
}

export function useMyRestaurant() {
    return useQuery({
        queryKey: ["myRestaurant"],
        queryFn: fetchMyRestaurant,
        staleTime: 5 * 60 * 1000, // 5 minutes
        retry: 2,
    });
}
