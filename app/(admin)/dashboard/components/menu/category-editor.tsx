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
  onSave: (data: { nameEn?: string; nameFr?: string; nameAr?: string }) => void;
}

export function CategoryEditor({
  open,
  onClose,
  category,
  onSave,
}: CategoryEditorProps) {
  const [nameEn, setNameEn] = useState("");
  const [nameFr, setNameFr] = useState("");
  const [nameAr, setNameAr] = useState("");

  useEffect(() => {
    if (category) {
      setNameEn(category.nameEn || "");
      setNameFr(category.nameFr || "");
      setNameAr(category.nameAr || "");
    } else {
      setNameEn("");
      setNameFr("");
      setNameAr("");
    }
  }, [category, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nameEn.trim() && !nameFr.trim() && !nameAr.trim()) return;

    onSave({
      nameEn: nameEn.trim() || undefined,
      nameFr: nameFr.trim() || undefined,
      nameAr: nameAr.trim() || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Modifier la catégorie" : "Ajouter une catégorie"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="category-name" className="text-sm">
              Nom de la catégorie
            </label>
            <Input
              placeholder="Name (English)"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
            />
            <Input
              placeholder="Nom (Français)"
              value={nameFr}
              onChange={(e) => setNameFr(e.target.value)}
            />
            <Input
              placeholder="الاسم (العربية)"
              dir="rtl"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              className="cursor-pointer"
              type="submit"
              disabled={!nameEn.trim() && !nameFr.trim() && !nameAr.trim()}
            >
              {category ? "Enregistrer les modifications" : "Ajouter une catégorie"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
