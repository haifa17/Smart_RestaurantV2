import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Category } from "@/lib/models/category";

interface CategoryEditorProps {
  open: boolean;
  onClose: () => void;
  category: Category | null;
  onSave: (data: { name: string }) => void;
}

export function CategoryEditor({
  open,
  onClose,
  category,
  onSave,
}: CategoryEditorProps) {
  const [name, setname] = useState("");

  useEffect(() => {
    if (category) {
      setname(category.name || "");
    } else {
      setname("");
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave({ name: name.trim() });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add Category"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="category-name" className="text-sm">Category Name</label>
            <Input
              id="category-name"
              placeholder="e.g., Entrées, Plats principaux"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={!name.trim()}
            >
              {category ? "Save Changes" : "Add Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
