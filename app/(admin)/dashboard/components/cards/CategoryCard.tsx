import { GripVertical, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Category } from "@/lib/models/category";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CategoryCardProps {
  category: Category;
  isFirst: boolean;
  isLast: boolean;

  onMove: (direction: "up" | "down") => void;
  onToggleVis: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function CategoryCard({
  category,
  isFirst,
  isLast,
  onMove,
  onToggleVis,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  return (
    <Card className="overflow-hidden bg-transparent border-none">
      <div className="flex items-center gap-3 p-4">
        {/* reorder */}
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

        {/* name */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium truncate capitalize">
            {category.nameEn ||
              category.nameFr ||
              category.nameAr ||
              "Unnamed"}
          </h3>
        </div>

        {/* actions */}
        <div className="flex gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleVis}
                className="p-2 hover:scale-110"
              >
                {category.visible ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              {category.visible ? "Hide category" : "Show category"}
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onEdit}
                className="p-2 hover:scale-110"
              >
                <Pencil className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Edit category</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onDelete}
                className="p-2 hover:text-destructive hover:scale-110"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>Delete category</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}
