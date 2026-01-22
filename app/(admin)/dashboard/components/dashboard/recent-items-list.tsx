"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { MenuItem } from "@/lib/models/menuItem";
import { Category } from "@/lib/models/category";
import { Restaurant } from "@/lib/models/restaurant";
import { fr } from "date-fns/locale";

interface RecentItemsListProps {
  menuItems: MenuItem[];
  categories: Category[];
  restaurant: Restaurant;
}

export function RecentItemsList({
  menuItems,
  categories,
  restaurant,
}: RecentItemsListProps) {
  const recentItems = [...menuItems]
    .sort(
      (a, b) =>
        new Date(b.updated_at ?? Date.now()).getTime() -
        new Date(a.updated_at ?? Date.now()).getTime(),
    )
    .slice(0, 5);

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.nameEn || "Unknown";
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: restaurant.currency ?? "TDN",
    }).format(price);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Récemment mis à jour{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-200"
          >
            <Avatar className="h-12 w-12 rounded-lg">
              <AvatarImage
                src={item.image || "/placeholder.svg"}
                alt={item.nameEn}
                className="object-cover"
              />
              <AvatarFallback className="rounded-lg bg-muted text-muted-foreground">
                {item.nameEn!.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground truncate">
                  {item.nameEn || item.nameFr || item.nameAr}
                </p>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    item.available
                      ? "border-primary/50 text-primary"
                      : "border-destructive/50 text-destructive",
                  )}
                >
                  {item.available ? "In Stock" : "Out"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{getCategoryName(item.categoryId)}</span>
                <span>•</span>
                <span>{formatPrice(item.price)}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground whitespace-nowrap">
              {formatDistanceToNow(
                new Date(item.updated_at ?? Date.now()).getTime(),
                {
                  addSuffix: true,
                  locale: fr 
                },
              )}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
