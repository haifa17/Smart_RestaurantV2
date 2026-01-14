import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface EmptyStateProps {
  onAddCard: () => void
}

export function EmptyState({ onAddCard }: EmptyStateProps) {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <BookOpen className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-foreground mb-1">No story cards yet</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Create your first story card to showcase your restaurant's story
      </p>
      <Button className="cursor-pointer" onClick={onAddCard} variant="outline">
        Add Story Card
      </Button>
    </Card>
  )
}