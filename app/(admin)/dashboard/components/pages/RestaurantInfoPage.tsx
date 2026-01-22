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
  console.log("restaurant", restaurant);
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
      onUpdate={(data) => updateRestaurant.mutate(data)}
      onUploadImage={(file, folder) =>
        uploadImage.mutateAsync({ file, folder })
      }
    />
  );
}
