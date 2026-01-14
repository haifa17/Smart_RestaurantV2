"use client";

import { toast } from "react-toastify";
import { useImageUpload } from "../../hooks/mutations/useImageUpload";
import { useStoryCardMutations } from "../../hooks/mutations/useStoryCardMutations";
import { useStoryCards } from "../../hooks/queries/useStoryCards";
import { StoryManagement } from "../story/StoryManagement";

interface StoryPageProps {
  restaurantId: string;
}

export function StoryPage({ restaurantId }: StoryPageProps) {
  const { data: storyCards = [], isLoading } = useStoryCards(restaurantId);

  const { createStoryCard, updateStoryCard, deleteStoryCard } =
    useStoryCardMutations(restaurantId);

  const uploadImage = useImageUpload();

  return (
    <StoryManagement
      storyCards={storyCards}
      isLoading={isLoading}
      onCreateStoryCard={(data) => createStoryCard.mutate(data)}
      onUpdateStoryCard={(id, data) => {
        if (!data.title || !data.subtitle) {
          toast.error("Title and subtitle are required");
          return;
        }
        updateStoryCard.mutate({
          id,
          data: { ...data, title: data.title, subtitle: data.subtitle },
        });
      }}
      onDeleteStoryCard={(id) => deleteStoryCard.mutate(id)}
      onUploadImage={(file, folder) =>
        uploadImage.mutateAsync({ file, folder })
      }
    />
  );
}
