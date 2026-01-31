import { MenuItem } from "@/lib/models/menuItem";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuItemCardProps {
  item: MenuItem;
  onToggle: (id: string) => void;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

export function MenuItemCard({
  item,
  onToggle,
  onEdit,
  onDelete,
}: MenuItemCardProps) {
  const description =
    item.descriptionEn || item.descriptionFr || item.descriptionAr;
  return (
    <div className="flex items-center gap-4 p-3  rounded-lg border transition-colors">
      {item.image ? (
        <img src={item.image} className="w-14 h-14 rounded-md object-cover" />
      ) : (
        <div className="w-14 h-14 rounded-md bg-muted" />
      )}

      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">
          {item.nameEn || item.nameFr || item.nameAr || "Unnamed"}
        </h4>
        {description && (
          <p className="text-sm  truncate">{description}</p>
        )}
        <p className="text-sm font-medium mt-0.5">
          {Number(item.price).toFixed(2)} £
        </p>
      </div>

      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onToggle(item.id)}
              className="p-2 hover:scale-110 cursor-pointer"
              aria-label="Toggle availability"
            >
              {item.available ? (
                <Eye className="h-4 w-4" />
              ) : (
                <EyeOff className="h-4 w-4" />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{item.available ? "Masquer l'élément" : "Afficher l'article"}</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onEdit(item)}
              className="p-2 hover:scale-110  cursor-pointer"
              aria-label="Edit item"
            >
              <Pencil className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Modifier l'élément</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => onDelete(item.id)}
              className="p-2 hover:scale-110 hover:text-destructive cursor-pointer"
              aria-label="Delete item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Supprimer l'élément</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
