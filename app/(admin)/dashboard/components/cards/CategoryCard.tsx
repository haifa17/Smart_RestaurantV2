import { Plus, GripVertical, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "./MenuItemCard";
import { Category } from "@/lib/models/category";
import { MenuItem } from "@/lib/models/menuItem";

interface CategoryCardProps {
  category: Category;
  items: MenuItem[];
  isFirst: boolean;
  isLast: boolean;
  onMove: (direction: "up" | "down") => void;
  onToggleVis: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onAddItem: () => void;
  onItemToggle: (id: string) => void;
  onItemEdit: (item: MenuItem) => void;
  onItemDelete: (id: string) => void;
}
export function CategoryCard({
  category,
  items,
  isFirst,
  isLast,
  onMove,
  onToggleVis,
  onEdit,
  onDelete,
  onAddItem,
  onItemToggle,
  onItemEdit,
  onItemDelete,
}: CategoryCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-3 p-4 bg-muted/50 border-b">
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => onMove("up")}
            disabled={isFirst}
            className="p-0.5 disabled:opacity-30"
          >
            <GripVertical className="h-3 w-3 rotate-180" />
          </button>
          <button
            onClick={() => onMove("down")}
            disabled={isLast}
            className="p-0.5 disabled:opacity-30"
          >
            <GripVertical className="h-3 w-3" />
          </button>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate">
            {category.name || "Unnamed"}
          </h3>
          <p className="text-xs text-muted-foreground">{items.length} items</p>
        </div>

        <div className="flex gap-2">
          <button onClick={onToggleVis} className="p-2">
            {category.visible ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
          <button onClick={onEdit} className="p-2">
            <Pencil className="h-4 w-4" />
          </button>
          <button onClick={onDelete} className="p-2 hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No items
          </p>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onToggle={onItemToggle}
                onEdit={onItemEdit}
                onDelete={onItemDelete}
              />
            ))}
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-4"
          onClick={onAddItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </Card>
  );
}
