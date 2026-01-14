import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  onAddCard: () => void;
}

export function EmptyState({ onAddCard }: EmptyStateProps) {
  return (
    <Card className="p-12 bg-transparent text-white border-none text-center">
      <div className="mx-auto w-12 h-12 rounded-full border flex items-center justify-center mb-4">
        <BookOpen className="h-6 w-6 t" />
      </div>
      <h3 className="font-medium mb-1">No story cards yet</h3>
      <p className="text-sm  mb-4">
        Create your first story card to showcase your restaurant's story
      </p>
      <Button
        className="cursor-pointer bg-[#D9D9D9] text-black hover:bg-[#D9D9D9]/80 flex items-center w-full mt-4"
        onClick={onAddCard}
      >
        <Plus size={15} /> Add Story Card
      </Button>
    </Card>
  );
}
