import { Plus, GripVertical, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "./MenuItemCard";
import { Category } from "@/lib/models/category";
import { MenuItem } from "@/lib/models/menuItem";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <Card className="overflow-hidden bg-transparent border-none">
      <div className="flex items-center gap-3 p-4 text-white">
        <div className="flex flex-col gap-0.5 ">
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
          <h3 className="font-medium truncate capitalize">
            {category.nameEn || category.nameFr || category.nameAr || "Unnamed"}
          </h3>
          <p className="text-xs text-white/80 ">{items.length} items</p>
        </div>

        <div className="flex gap-2">
          {/* Toggle visibility */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleVis}
                className="p-2 hover:scale-110 cursor-pointer"
              >
                {category.visible ? (
                  <Eye className="h-4 w-4 text-[#D9D9D9]" />
                ) : (
                  <EyeOff className="h-4 w-4 text-[#D9D9D9]" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{category.visible ? "Hide category" : "Show category"}</p>
            </TooltipContent>
          </Tooltip>

          {/* Edit */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onEdit}
                className="p-2 hover:scale-110 cursor-pointer"
              >
                <Pencil className="h-4 w-4 text-[#D9D9D9]" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit category</p>
            </TooltipContent>
          </Tooltip>

          {/* Delete */}
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onDelete}
                className="p-2 hover:text-destructive hover:scale-110 cursor-pointer"
              >
                <Trash2 className="h-4 w-4 text-[#D9D9D9]" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete category</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div className="p-4">
        {items.length === 0 ? (
          <p className="text-sm text-white text-center py-4">No items</p>
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
          className="w-full mt-4 cursor-pointer bg-[#D9D9D9]"
          onClick={onAddItem}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>
    </Card>
  );
}
