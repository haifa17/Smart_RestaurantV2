"use client";
import {
  Clock,
  FolderOpen,
  Pencil,
  Plus,
  QrCode,
  UtensilsCrossed,
} from "lucide-react";
import { StatCard } from "../cards/stat-card";
import { formatDistanceToNow } from "date-fns";
import { useCategories } from "../../hooks/queries/useCategories";
import { useMenuItems } from "../../hooks/queries/useMenuItems";
import { RecentItemsList } from "../dashboard/recent-items-list";
import { CategoryOverview } from "../dashboard/category-overview";
import { useRestaurant } from "../../hooks/queries/useRestaurant";
import { fr } from "date-fns/locale";
import { QuickActionCard } from "../cards/quick-action-card";
import { useTab } from "@/components/contexts/TabContext";

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

  if (catLoading || itemsLoading || restaurantLoading)
    return <div>Loading..</div>;

  const stats = {
    totalCategories: categories.length,
    totalItems: menuItems.length,
    lastUpdated: menuItems.length
      ? menuItems[0].updated_at
      : new Date().toISOString(),
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          title="Dernière mise à jour"
          value={formatDistanceToNow(
            new Date(stats.lastUpdated ?? new Date().toISOString()),
            { addSuffix: false, locale: fr },
          )}
          icon={<Clock className="h-5 w-5 text-white" />}
        />
      </div>
      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionCard
            title="Ajouter un article"
            description="Ajouter un nouvel élément de menu"
            icon={<Plus className="h-5 w-5" />}
            onClick={() => setActiveTab("menu", "add")}
            variant="primary"
          />
          <QuickActionCard
            title="Modifier le menu"
            description="Gérez vos éléments de menu"
            icon={<Pencil className="h-5 w-5" />}
            onClick={() => setActiveTab("menu")}
          />
          <QuickActionCard
            title="Télécharger le code QR"
            description="Obtenez votre code QR de menu"
            icon={<QrCode className="h-5 w-5" />}
            onClick={() => setActiveTab("qr")}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {restaurant && (
          <RecentItemsList
            menuItems={menuItems}
            categories={categories}
            restaurant={restaurant}
          />
        )}
        <CategoryOverview menuItems={menuItems} categories={categories} />
      </div>
    </div>
  );
}
