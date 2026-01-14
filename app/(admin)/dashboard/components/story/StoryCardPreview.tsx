interface StoryCardPreviewProps {
  image: string | null
  title: string
  subtitle: string
}

export function StoryCardPreview({ image, title, subtitle }: StoryCardPreviewProps) {
  return (
    <div className="flex-1 p-3 rounded-lg border border-border bg-muted/30">
      <p className="text-xs text-muted-foreground mb-2">Preview</p>
      <div className="space-y-2">
        {image && (
          <img src={image} alt="Preview" className="w-full h-20 rounded object-cover" />
        )}
        <div>
          <p className="font-semibold text-sm text-foreground">
            {title || "Card Title"}
          </p>
          <p className="text-xs text-muted-foreground">
            {subtitle || "Card subtitle"}
          </p>
        </div>
      </div>
    </div>
  )
}