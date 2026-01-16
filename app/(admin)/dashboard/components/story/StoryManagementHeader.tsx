import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface StoryManagementHeaderProps {
  onAddCard: () => void
}

export function StoryManagementHeader({ onAddCard }: StoryManagementHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold ">Story Cards</h2>
        <p className="text-sm text-white/80 mt-1">
          Manage your restaurant's story cards
        </p>
      </div>
      <Button onClick={onAddCard} className="cursor-pointer bg-orange-700/90 text-white hover:bg-orange-700 flex items-center">
        <Plus className="h-4 w-4" />
        Add Story Card
      </Button>
    </div>
  )
}