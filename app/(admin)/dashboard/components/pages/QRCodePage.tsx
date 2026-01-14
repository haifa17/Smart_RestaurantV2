"use client";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useRestaurant } from "../../hooks/queries/useRestaurant";
import { QRCodeScreen } from "../qrcode/QRCodeScreen";

interface QRCodePageProps {
  restaurantId: string;
}

export function QRCodePage({ restaurantId }: QRCodePageProps) {
  const { data: restaurant, isLoading } = useRestaurant(restaurantId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return <QRCodeScreen restaurant={restaurant} />;
}
