"use client";

import { useEffect } from "react";
import { useTab } from "@/components/contexts/TabContext";
import { TabsMangement } from "./TabsMangement";
import { LoadingSpinner } from "@/components/Loading";
import { useMyRestaurant } from "../hooks/mutations/useMyRestaurantMutation";
import { OrderNotificationProvider } from "../contexts/OrderNotificationContext";
import { OrderNotificationBell } from "./notifications/OrderNotificationBell";
import { NotificationPermissionPrompt } from "./notifications/NotificationPermissionPrompt";

export default function DashboardClient() {
  const { activeTab, setActiveTab } = useTab();
  const { data: restaurant, isLoading, error } = useMyRestaurant();

  // Listen for service worker messages to navigate to orders tab
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    const handleServiceWorkerMessage = (event: MessageEvent) => {
      if (event.data?.type === "NAVIGATE_TO_ORDERS") {
        setActiveTab("orders");
      }
    };

    navigator.serviceWorker.addEventListener("message", handleServiceWorkerMessage);

    // Also check URL params for tab on initial load (when opened from notification)
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get("tab");
    if (tabParam === "orders") {
      setActiveTab("orders");
      // Clean up URL
      window.history.replaceState({}, "", window.location.pathname);
    }

    return () => {
      navigator.serviceWorker.removeEventListener("message", handleServiceWorkerMessage);
    };
  }, [setActiveTab]);

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

  const handleOrderClick = () => {
    // Navigate to orders tab when clicking a notification
    setActiveTab("orders");
  };

  return (
    <OrderNotificationProvider restaurantId={restaurant.restaurantId} onNotificationClick={handleOrderClick}>
      {/* Notification Permission Prompt - Shows on first visit */}
      <NotificationPermissionPrompt />

      <div className="p-8">
        {/* Notification Bell - Fixed Position */}
        <div className="fixed top-4 right-20 z-50">
          <OrderNotificationBell onOrderClick={handleOrderClick} />
        </div>
        <TabsMangement activeTab={activeTab} restaurantId={restaurant.restaurantId} />
      </div>
    </OrderNotificationProvider>
  );
}