"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useImageUpload } from "../hooks/mutations/useImageUpload";
import { useRestaurantMutations } from "../hooks/mutations/useRestaurantMutations";
import { useRestaurant } from "../hooks/queries/useRestaurant";
import RestaurantInfo from "../components/RestaurantInfo";

interface RestaurantInfoPageProps {
  restaurantId: string;
}

export function RestaurantInfoPage({ restaurantId }: RestaurantInfoPageProps) {
  const { data: restaurant, isLoading } = useRestaurant(restaurantId);
  const { updateRestaurant } = useRestaurantMutations(restaurantId);
  const uploadImage = useImageUpload();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
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
