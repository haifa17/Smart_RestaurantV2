import type React from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";

interface HeroImageSectionProps {
  heroImage: string | null | undefined;
  isUploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function HeroImageSection({
  heroImage,
  isUploading,
  onUpload,
  onRemove,
}: HeroImageSectionProps) {
  return (
    <div className="space-y-2">
      <label>Hero Background</label>

      {isUploading ? (
        <div className="w-full h-32 rounded-lg border border-border flex items-center justify-center bg-muted">
          <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
        </div>
      ) : heroImage ? (
        <div className="relative">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-full h-32 rounded-lg object-cover border border-border"
          />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-2 right-2 p-1.5 bg-foreground/80 text-background rounded-full hover:bg-foreground transition-colors"
            aria-label="Remove hero image"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <label className=" w-full h-32 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground transition-colors">
          <ImagePlus className="h-8 w-8 text-muted-foreground mb-2" />
          <span className="text-sm text-muted-foreground">
            Upload hero image
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      )}
    </div>
  );
}
