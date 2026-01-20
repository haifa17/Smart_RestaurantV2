"use client";

import { CategoriesPage } from "./pages/CategoriesPage";
import { MenuPage } from "./pages/MenuPage";
import { QRCodePage } from "./pages/QRCodePage";
import { RestaurantInfoPage } from "./pages/RestaurantInfoPage";

interface Props {
  activeTab: "menu" | "categories" | "qr" | "info"
  restaurantId: string;
}

export function TabsMangement({ activeTab, restaurantId }: Props) {
  switch (activeTab) {
    case "menu":
      return <MenuPage restaurantId={restaurantId} />;
    case "categories":
      return <CategoriesPage restaurantId={restaurantId} />;
    case "qr":
      return <QRCodePage restaurantId={restaurantId} />;
    case "info":
      return <RestaurantInfoPage restaurantId={restaurantId} />;
    default:
      return null;
  }
}
