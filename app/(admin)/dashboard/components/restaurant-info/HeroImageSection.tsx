import type React from "react";
import { ImagePlus, X } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
    <div className="flex flex-col  gap-2 lg:gap-4">
      <label>Hero Background</label>

      {isUploading ? (
        <LoadingSpinner />
      ) : heroImage ? (
        <div className="relative">
          <img
            src={heroImage}
            alt="Hero background"
            className="w-32 h-32 rounded-lg object-cover"
          />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={onRemove}
                  className="absolute cursor-pointer -top-2 -right-2 p-1.5 rounded-full bg-foreground text-background"
                >
                  <X size={20} />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="capitalize">Remove hero image</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
        <label className="w-full h-52 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground transition-colors">
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
