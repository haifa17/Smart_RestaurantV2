"use client";

import { CategoriesPage } from "./pages/CategoriesPage";
import { DashboardPage } from "./pages/DashboardPage";
import { MenuPage } from "./pages/MenuPage";
import { OrdersPage } from "./pages/OrdersPage";
import { QRCodePage } from "./pages/QRCodePage";
import { RestaurantInfoPage } from "./pages/RestaurantInfoPage";

interface Props {
  activeTab: "dashboard" | "menu" | "categories" | "orders" | "qr" | "info";
  restaurantId: string;
}

export function TabsMangement({ activeTab, restaurantId }: Props) {
  switch (activeTab) {
    case "dashboard":
      return <DashboardPage restaurantId={restaurantId} />;
    case "menu":
      return <MenuPage restaurantId={restaurantId} />;
    case "categories":
      return <CategoriesPage restaurantId={restaurantId} />;
    case "orders":
      return <OrdersPage restaurantId={restaurantId} />;
    case "qr":
      return <QRCodePage restaurantId={restaurantId} />;
    case "info":
      return <RestaurantInfoPage restaurantId={restaurantId} />;
    default:
      return null;
  }
}
