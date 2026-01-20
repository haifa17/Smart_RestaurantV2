import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "./MenuItemCard";
import { Category } from "@/lib/models/category";
import { MenuItem } from "@/lib/models/menuItem";

interface MenuCategoryCardProps {
  category: Category;
  items: MenuItem[];

  onAddItem: () => void;
  onItemToggle: (id: string) => void;
  onItemEdit: (item: MenuItem) => void;
  onItemDelete: (id: string) => void;
}

export function MenuCategoryCard({
  category,
  items,
  onAddItem,
  onItemToggle,
  onItemEdit,
  onItemDelete,
}: MenuCategoryCardProps) {
  return (
    <Card className="bg-transparent border-none p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium capitalize">
          {category.nameEn ||
            category.nameFr ||
            category.nameAr ||
            "Unnamed"}
        </h3>

        <Button  size="sm" variant="outline" onClick={onAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-center py-4">No items</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onToggle={() => onItemToggle(item.id)}
              onEdit={() => onItemEdit(item)}
              onDelete={() => onItemDelete(item.id)}
            />
          ))}
        </div>
      )}
    </Card>
  );
}
