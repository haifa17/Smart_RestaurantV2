import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StoryManagementHeaderProps {
  onAddCard: () => void
}

export function StoryManagementHeader({ onAddCard }: StoryManagementHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Story Cards</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your restaurant's story cards
        </p>
      </div>
      <Button onClick={onAddCard} className="gap-2">
        <Plus className="h-4 w-4" />
        Add Story Card
      </Button>
    </div>
  )
}