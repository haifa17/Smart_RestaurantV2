"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Category } from "@/lib/models/category";
import { MenuItem } from "@/lib/models/menuItem";

interface Props {
  menuItems: MenuItem[];
  categories: Category[];
}
export function CategoryOverview({ menuItems, categories }: Props) {
  const totalItems = menuItems.length;
  const visibleCategories = categories.filter((c) => c.visible);
  const getItemCount = (categoryId: string) =>
    menuItems.filter((item) => item.categoryId === categoryId).length;
  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-foreground">
          Aperçu des catégories{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {visibleCategories.map((category) => {
          const itemCount = getItemCount(category.id);
          const percentage =
            totalItems > 0 ? (itemCount / totalItems) * 100 : 0;

          return (
            <div key={category.id} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">
                  {category.nameEn || category.nameFr || category.nameAr}
                </span>
                <span className="text-muted-foreground">
                  {itemCount} articles
                </span>
              </div>
              <Progress value={percentage} className="h-2 bg-linear-to-r from-blue-500 to-blue-700" />
            </div>
          );
        })}
        {visibleCategories.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Aucune catégorie pour l'instant{" "}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
