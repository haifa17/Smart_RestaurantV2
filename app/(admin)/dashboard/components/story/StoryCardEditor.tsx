import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { StoryCard } from "@/lib/models/story"
import { ImageUploadSection } from "./ImageUploadSection"


interface StoryCardEditorProps {
  open: boolean
  onClose: () => void
  storyCard: StoryCard | null
  onSave: (storyCard: Partial<StoryCard>) => void
  onUploadImage: (file: File, folder: 'story-cards') => Promise<{ url: string }>
}

export function StoryCardEditor({ open, onClose, storyCard, onSave, onUploadImage }: StoryCardEditorProps) {
  const [title, setTitle] = useState("")
  const [subtitle, setSubtitle] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (storyCard) {
      setTitle(storyCard.title || "")
      setSubtitle(storyCard.subtitle || "")
      setImage(storyCard.image || null)
    } else {
      setTitle("")
      setSubtitle("")
      setImage(null)
    }
  }, [storyCard, open])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const { url } = await onUploadImage(file, 'story-cards')
      setImage(url)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim() && subtitle.trim()) {
      onSave({
        title: title.trim(),
        subtitle: subtitle.trim(),
        image,
      })
    }
  }

  const isFormValid = title.trim() && subtitle.trim() && !isUploading

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{storyCard ? "Edit Story Card" : "Add Story Card"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            <ImageUploadSection
              image={image}
              isUploading={isUploading}
              title={title}
              subtitle={subtitle}
              onImageUpload={handleImageUpload}
              onImageRemove={() => setImage(null)}
            />

            <div className="space-y-2">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                placeholder="e.g., Master Grillers"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={100}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="subtitle">Subtitle</label>
              <Input
                id="subtitle"
                placeholder="e.g., Three generations of expertise"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                maxLength={200}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!isFormValid}>
              {storyCard ? "Save Changes" : "Add Story Card"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}