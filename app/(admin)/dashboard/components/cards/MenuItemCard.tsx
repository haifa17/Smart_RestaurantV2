import { MenuItem } from "@/lib/models/menuItem";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";

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
  return (
    <div className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
      {item.image ? (
        <img src={item.image} className="w-14 h-14 rounded-md object-cover" />
      ) : (
        <div className="w-14 h-14 rounded-md bg-muted" />
      )}

      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{item.name || "Unnamed"}</h4>
        {item.descriptionFr && (
          <p className="text-sm text-muted-foreground truncate">
            {item.descriptionFr}
          </p>
        )}
        <p className="text-sm font-medium mt-0.5">
          {Number(item.price).toFixed(2)} TND
        </p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onToggle(item.id)}
          className="p-2 hover:text-foreground"
          aria-label="Toggle availability"
        >
          {item.available ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </button>
        <button
          onClick={() => onEdit(item)}
          className="p-2 hover:text-foreground"
          aria-label="Edit item"
        >
          <Pencil className="h-4 w-4" />
        </button>
        <button
          onClick={() => onDelete(item.id)}
          className="p-2 hover:text-destructive"
          aria-label="Delete item"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
