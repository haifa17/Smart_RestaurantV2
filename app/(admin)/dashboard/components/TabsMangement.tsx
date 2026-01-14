"use client";

import { MenuPage } from "./pages/MenuPage";
import { StoryPage } from "./pages/StoryPage";
import { QRCodePage } from "./pages/QRCodePage";
import { RestaurantInfoPage } from "./pages/RestaurantInfoPage";

interface Props {
  activeTab: "menu" | "qr" | "info" | "story";
  restaurantId: string;
}

export function TabsMangement({ activeTab, restaurantId }: Props) {
  switch (activeTab) {
    case "menu":
      return <MenuPage restaurantId={restaurantId} />;
    case "story":
      return <StoryPage restaurantId={restaurantId} />;
    case "qr":
      return <QRCodePage restaurantId={restaurantId} />;
    case "info":
      return <RestaurantInfoPage restaurantId={restaurantId} />;
    default:
      return null;
  }
}
