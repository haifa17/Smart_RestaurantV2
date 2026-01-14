import { useState } from "react";
import { StoryManagementHeader } from "./StoryManagementHeader";
import { StoryCard } from "@/lib/models/story";
import { StoryCardGrid } from "./StoryCardGrid";
import { EmptyState } from "./EmptyState";
import { StoryCardEditor } from "./StoryCardEditor";
import { DeleteDialog } from "@/components/dialogs/DeleteDialog";

interface StoryManagementProps {
  storyCards: StoryCard[];
  isLoading: boolean;
  onCreateStoryCard: (data: {
    title: string;
    subtitle: string;
    image?: string | null;
    visible?: boolean;
  }) => void;
  onUpdateStoryCard: (
    id: string,
    data: {
      title?: string;
      subtitle?: string;
      image?: string | null;
      visible?: boolean;
    }
  ) => void;
  onDeleteStoryCard: (id: string) => void;
  onUploadImage: (
    file: File,
    folder: "story-cards"
  ) => Promise<{ url: string }>;
}

export function StoryManagement({
  storyCards,
  isLoading,
  onCreateStoryCard,
  onUpdateStoryCard,
  onDeleteStoryCard,
  onUploadImage,
}: StoryManagementProps) {
  const [editingCard, setEditingCard] = useState<StoryCard | null>(null);
  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleCreateCard = (data: Partial<StoryCard>) => {
    onCreateStoryCard(data as any);
    setIsCreatingCard(false);
  };

  const handleUpdateCard = (data: Partial<StoryCard>) => {
    if (editingCard) {
      onUpdateStoryCard(editingCard.id, data);
      setEditingCard(null);
    }
  };

  const handleDeleteCard = (id: string) => {
    onDeleteStoryCard(id);
    setDeleteConfirm(null);
  };

  const handleToggleVisibility = (id: string) => {
    const card = storyCards.find((c) => c.id === id);
    if (card) {
      onUpdateStoryCard(id, {
        title: card.title,
        subtitle: card.subtitle,
        visible: !card.visible,
        image: card.image, // optional, if your mutation requires it
      });
    }
  };

  const sortedCards = [...storyCards].sort((a, b) => a.order! - b.order!);

  return (
    <div className="space-y-6">
      <StoryManagementHeader onAddCard={() => setIsCreatingCard(true)} />

      {storyCards.length === 0 ? (
        <EmptyState onAddCard={() => setIsCreatingCard(true)} />
      ) : (
        <StoryCardGrid
          cards={sortedCards}
          onEdit={setEditingCard}
          onDelete={setDeleteConfirm}
          onToggleVisibility={handleToggleVisibility}
        />
      )}

      <StoryCardEditor
        open={isCreatingCard || editingCard !== null}
        onClose={() => {
          setIsCreatingCard(false);
          setEditingCard(null);
        }}
        storyCard={editingCard}
        onSave={(data) => {
          editingCard ? handleUpdateCard(data) : handleCreateCard(data);
        }}
        onUploadImage={onUploadImage}
      />

      <DeleteDialog
        title="Delete Story Card?"
        description="This will permanently delete this story card. This action cannot be undone."
        open={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDeleteCard(deleteConfirm)}
      />
    </div>
  );
}
