"use client";

import { useTab } from "@/components/contexts/TabContext";
import { TabsMangement } from "./TabsMangement";
import { LoadingSpinner } from "@/components/Loading";
import { useMyRestaurant } from "../hooks/mutations/useMyRestaurantMutation";

export default function DashboardClient() {
  const { activeTab } = useTab();
  const { data: restaurant, isLoading, error } = useMyRestaurant();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-500">Chargement de votre restaurant...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant?.restaurantId) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center text-gray-500">
          <p>Impossible de charger le restaurant. Veuillez actualiser la page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <TabsMangement activeTab={activeTab} restaurantId={restaurant.restaurantId} />
    </div>
  );
}