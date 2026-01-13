"use client";

import { useImageUpload } from "../../hooks/mutations/useImageUpload";
import { useStoryCardMutations } from "../../hooks/mutations/useStoryCardMutations";
import { useStoryCards } from "../../hooks/queries/useStoryCards";
import StoryManagement from "../StoryManagement";

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
      onUpdateStoryCard={(id, data) => updateStoryCard.mutate({ id, data })}
      onDeleteStoryCard={(id) => deleteStoryCard.mutate(id)}
      onUploadImage={(file, folder) =>
        uploadImage.mutateAsync({ file, folder })
      }
    />
  );
}
