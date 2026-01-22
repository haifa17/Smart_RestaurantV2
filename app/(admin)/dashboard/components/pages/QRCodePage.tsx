"use client";
import { useRestaurant } from "../../hooks/queries/useRestaurant";
import { QRCodeScreen } from "../qrcode/QRCodeScreen";
import { LoadingSpinner } from "@/components/Loading";

interface QRCodePageProps {
  restaurantId: string;
}

export function QRCodePage({ restaurantId }: QRCodePageProps) {
  const { data: restaurant, isLoading } = useRestaurant(restaurantId);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!restaurant) {
    return <div>Restaurant introuvable</div>;
  }

  return <QRCodeScreen restaurant={restaurant} />;
}
