"use client";

import { useImageUpload } from "../../hooks/mutations/useImageUpload";
import { useRestaurantMutations } from "../../hooks/mutations/useRestaurantMutations";
import { useRestaurant } from "../../hooks/queries/useRestaurant";
import { RestaurantInfo } from "../restaurant-info/RestaurantInfo";
import { LoadingSpinner } from "@/components/Loading";

interface RestaurantInfoPageProps {
  restaurantId: string;
}

export function RestaurantInfoPage({ restaurantId }: RestaurantInfoPageProps) {
  console.log("restaurantId", restaurantId);

  const { data: restaurant, isLoading } = useRestaurant(restaurantId);
  console.log("restaurant data:", restaurant);
  console.log("restaurant.schedules:", restaurant?.schedules);
  const { updateRestaurant } = useRestaurantMutations(restaurantId);
  const uploadImage = useImageUpload();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!restaurant) {
    return <div>Restaurant introuvable</div>;
  }

  return (
    <RestaurantInfo
      restaurant={restaurant}
      isLoading={isLoading}
      onUpdate={(data) => {
        console.log("=== onUpdate called ===");
        console.log("Update data being sent:", data);
        console.log("Schedules in update:", data.schedules);
        updateRestaurant.mutate(data);
      }}
      onUploadImage={(file, folder) =>
        uploadImage.mutateAsync({ file, folder })
      }
    />
  );
}
