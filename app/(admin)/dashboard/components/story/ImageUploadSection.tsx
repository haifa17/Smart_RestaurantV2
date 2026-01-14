import type React from "react";
import { ImagePlus, X } from "lucide-react";
import { StoryCardPreview } from "./StoryCardPreview";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface ImageUploadSectionProps {
  image: string | null;
  isUploading: boolean;
  title: string;
  subtitle: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
}

export function ImageUploadSection({
  image,
  isUploading,
  title,
  subtitle,
  onImageUpload,
  onImageRemove,
}: ImageUploadSectionProps) {
  return (
    <div className="flex flex-col gap-2">
      <label>Card Image</label>
      <div className="flex items-start gap-4">
        {isUploading ? (
          <LoadingSpinner />
        ) : image ? (
          <div className="relative">
            <img
              src={image}
              alt="Preview"
              className="w-24 h-24 rounded-lg object-cover border border-border"
            />
            <button
              type="button"
              onClick={onImageRemove}
              className="absolute -top-2 -right-2 p-1 bg-foreground text-background rounded-full hover:bg-foreground/80 transition-colors cursor-pointer"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ) : (
          <label className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground transition-colors">
            <ImagePlus className="h-6 w-6 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Upload</span>
            <input
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        )}

        <StoryCardPreview image={image} title={title} subtitle={subtitle} />
      </div>
    </div>
  );
}
