import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ImagePlus, X } from "lucide-react";

interface LogoImageSectionProps {
  logoImage: string | null | undefined;
  isUploading: boolean;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export function LogoImageSection({
  logoImage,
  isUploading,
  onUpload,
  onRemove,
}: LogoImageSectionProps) {
  return (
    <div className="flex flex-col gap-2 lg:gap-4 text-white">
      <label>Restaurant Logo</label>

      {isUploading ? (
        <LoadingSpinner />
      ) : logoImage ? (
        <div className="relative group justify-center flex">
          <img
            src={logoImage}
            alt="Restaurant logo"
            className="w-32 h-32 rounded-full object-cover"
          />
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
                <p>Remove logo</p>
              </TooltipContent>
            </Tooltip>
        </div>
      ) : (
        <label className="w-32 h-32 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground transition-colors">
          <ImagePlus className="h-6 w-6 text-muted-foreground mb-1" />
          <span className="text-sm text-muted-foreground">Upload logo</span>
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
