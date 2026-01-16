import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { StoryCard } from "@/lib/models/story";
import { Eye, EyeOff, Pencil, Trash2, BookOpen } from "lucide-react";

interface StoryCardItemProps {
  card: StoryCard;
  onEdit: () => void;
  onDelete: () => void;
  onToggleVisibility: () => void;
}

export function StoryCardItem({
  card,
  onEdit,
  onDelete,
  onToggleVisibility,
}: StoryCardItemProps) {
  return (
    <Card className="overflow-hidden  shadow-md ">
      <div className="relative aspect-video">
        {card.image ? (
          <div className=" p-4 ">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover "
            />
          </div>
        ) : (
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <BookOpen className="h-12 w-12 " />
          </div>
        )}
        {!card.visible && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-sm font-medium">Hidden</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold capitalize ">
              {card.title}
            </h3>
            <p className="text-sm ">
              {card.subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onToggleVisibility}
                className="flex-1 p-2 cursor-pointer  hover:text-foreground transition-colors border border-border rounded-md hover:bg-muted"
                title={card.visible ? "Hide card" : "Show card"}
              >
                {card.visible ? (
                  <Eye className="h-4 w-4 mx-auto" />
                ) : (
                  <EyeOff className="h-4 w-4 mx-auto" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{card.visible ? "Hide card" : "Show card"}</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onEdit}
                className="flex-1 p-2 cursor-pointer  hover:text-foreground transition-colors border border-border rounded-md hover:bg-muted"
              >
                <Pencil className="h-4 w-4 mx-auto" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit card</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onDelete}
                className="flex-1 p-2 cursor-pointer  hover:text-destructive transition-colors border border-border rounded-md hover:bg-destructive/10"
              >
                <Trash2 className="h-4 w-4 mx-auto" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete card</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </Card>
  );
}
