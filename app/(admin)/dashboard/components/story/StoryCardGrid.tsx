import { StoryCard } from "@/lib/models/story";
import { StoryCardItem } from "../cards/StoryCardItem";

interface StoryCardGridProps {
  cards: StoryCard[];
  onEdit: (card: StoryCard) => void;
  onDelete: (id: string) => void;
  onToggleVisibility: (id: string) => void;
}

export function StoryCardGrid({
  cards,
  onEdit,
  onDelete,
  onToggleVisibility,
}: StoryCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <StoryCardItem
          key={card.id}
          card={card}
          onEdit={() => onEdit(card)}
          onDelete={() => onDelete(card.id)}
          onToggleVisibility={() => onToggleVisibility(card.id)}
        />
      ))}
    </div>
  );
}
