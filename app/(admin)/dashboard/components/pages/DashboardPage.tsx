"use client";
import {
  Euro,
  FolderOpen,
  Plus,
  QrCode,
  ShoppingCart,
  UtensilsCrossed,
} from "lucide-react";
import { StatCard } from "../cards/stat-card";
import { useCategories } from "../../hooks/queries/useCategories";
import { useMenuItems } from "../../hooks/queries/useMenuItems";
import { RecentItemsList } from "../dashboard/recent-items-list";
import { CategoryOverview } from "../dashboard/category-overview";
import { useRestaurant } from "../../hooks/queries/useRestaurant";
import { QuickActionCard } from "../cards/quick-action-card";
import { useTab } from "@/components/contexts/TabContext";
import { useOrderStats } from "../../hooks/queries/useOrderStats";
import { useOrders } from "../../hooks/queries/useOrders";
import { RecentOrdersList } from "../dashboard/recent-orders-list";

interface Props {
  restaurantId: string;
}
export function DashboardPage({ restaurantId }: Props) {
  const { setActiveTab } = useTab();
  const { data: categories = [], isLoading: catLoading } =
    useCategories(restaurantId);
  const { data: menuItems = [], isLoading: itemsLoading } =
    useMenuItems(restaurantId);
  const { data: restaurant, isLoading: restaurantLoading } =
    useRestaurant(restaurantId);
  const { data: orders = [], isLoading: ordersLoading } =
    useOrders(restaurantId);
  const { data: orderStats } = useOrderStats(restaurantId);
  if (catLoading || itemsLoading || restaurantLoading || ordersLoading)
    return <div>Loading..</div>;
  const stats = {
    totalCategories: categories.length,
    totalItems: menuItems.length,
    lastUpdated: menuItems.length
      ? menuItems[0].updated_at
      : new Date().toISOString(),
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "PENDING").length,
    revenueToday: orderStats?.revenueToday || 0,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue ! Voici un aperçu de votre menu.{" "}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total des catégories"
          value={stats.totalCategories}
          icon={<FolderOpen className="h-5 w-5 text-white" />}
          description="Sections de menu actives"
        />
        <StatCard
          title="Éléments de menu"
          value={stats.totalItems}
          icon={<UtensilsCrossed className="h-5 w-5 text-white" />}
          description="Plats disponibles"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Commandes en attente"
          value={stats.pendingOrders}
          icon={<ShoppingCart className="h-5 w-5 text-white" />}
          description={`${stats.totalOrders} commandes au total`}
        />
        <StatCard
          title="Revenus aujourd'hui"
          value={`${stats.revenueToday.toFixed(0)} EUR`}
          icon={<Euro className="h-5 w-5 text-white" />}
          description={`${orderStats?.completedToday || 0} commandes terminées`}
        />
      </div>
      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            title="Nouvelle commande"
            description="Créer une nouvelle commande"
            icon={<Plus className="h-5 w-5" />}
            onClick={() => setActiveTab("orders", "add")}
            variant="primary"
          />
          <QuickActionCard
            title="Ajouter un article"
            description="Ajouter un élément au menu"
            icon={<Plus className="h-5 w-5" />}
            onClick={() => setActiveTab("menu", "add")}
          />
          <QuickActionCard
            title="Gérer les commandes"
            description="Voir toutes les commandes"
            icon={<ShoppingCart className="h-5 w-5" />}
            onClick={() => setActiveTab("orders")}
          />
          <QuickActionCard
            title="Télécharger le code QR"
            description="Obtenez votre code QR"
            icon={<QrCode className="h-5 w-5" />}
            onClick={() => setActiveTab("qr")}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {restaurant && (
          <>
            <RecentOrdersList orders={orders} restaurantId={restaurantId} />
            <RecentItemsList
              menuItems={menuItems}
              categories={categories}
              restaurant={restaurant}
            />
          </>
        )}
        <CategoryOverview menuItems={menuItems} categories={categories} />
      </div>
    </div>
  );
}
