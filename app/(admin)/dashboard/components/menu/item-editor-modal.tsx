import type React from "react";
import { useState, useEffect } from "react";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MenuItem } from "@/lib/models/menuItem";
import { Category } from "@/lib/models/category";

interface ItemEditorModalProps {
  open: boolean;
  onClose: () => void;
  item: MenuItem | null;
  categoryId: string;
  categories: Category[];
  onSave: (item: Omit<MenuItem, "id">) => void;
  onUploadImage: (file: File, folder: "menu-items") => Promise<{ url: string }>;
  restaurantId: string;
}

export function ItemEditorModal({
  open,
  onClose,
  item,
  categoryId,
  categories,
  onSave,
  onUploadImage,
  restaurantId,
}: ItemEditorModalProps) {
  const [nameEn, setNameEn] = useState("");
  const [nameFr, setNameFr] = useState("");
  const [nameAr, setNameAr] = useState("");

  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [isUploading, setIsUploading] = useState(false);
  const [isChefRecommendation, setIsChefRecommendation] = useState(false);
  const [isPopular, setIsPopular] = useState(false);
  const [isSpicy, setIsSpicy] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  useEffect(() => {
    if (item) {
      setNameEn(item.nameEn || "");
      setNameFr(item.nameFr || "");
      setNameAr(item.nameAr || "");

      setDescriptionEn(item.descriptionEn || "");
      setDescriptionFr(item.descriptionFr || "");
      setDescriptionAr(item.descriptionAr || "");
      setPrice(item.price.toString());
      setImage(item.image || null);
      setSelectedCategoryId(item.categoryId);
      setIsChefRecommendation(item.isChefRecommendation ?? false);
      setIsPopular(item.isPopular ?? false);
      setIsSpicy(item.isSpicy ?? false);
      setIsVegetarian(item.isVegetarian ?? false);
    } else {
      setNameEn("");
      setNameFr("");
      setNameAr("");
      setDescriptionEn("");
      setDescriptionFr("");
      setDescriptionAr("");
      setPrice("");
      setImage(null);
      setSelectedCategoryId(categoryId);
      setIsChefRecommendation(false);
      setIsPopular(false);
      setIsSpicy(false);
      setIsVegetarian(false);
    }
  }, [item, categoryId, open]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const { url } = await onUploadImage(file, "menu-items");
        setImage(url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !price ||
      !selectedCategoryId ||
      !restaurantId ||
      (!nameEn.trim() && !nameFr.trim() && !nameAr.trim())
    ) {
      return;
    }

    onSave({
      restaurantId,
      categoryId: selectedCategoryId,

      nameEn: nameEn.trim() || undefined,
      nameFr: nameFr.trim() || undefined,
      nameAr: nameAr.trim() || undefined,

      descriptionEn: descriptionEn.trim() || undefined,
      descriptionFr: descriptionFr.trim() || undefined,
      descriptionAr: descriptionAr.trim() || undefined,

      price: Number(price),
      image,

      available: true,
      isActive: true,
      isChefRecommendation,
      isPopular,
      isSpicy,
      isVegetarian,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {item ? "Modifier l'article" : "Ajouter un article"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* Image Upload */}
            <div className="flex flex-col gap-2">
              <label>Image de l&apos;article</label>
              <div className="flex items-start gap-4">
                {isUploading ? (
                  <div className="w-24 h-24 rounded-lg border border-border flex flex-col items-center justify-center bg-muted">
                    <Loader2 className="h-6 w-6 text-muted-foreground animate-spin" />
                  </div>
                ) : image ? (
                  <div className="relative">
                    <img
                      src={image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-24 h-24 rounded-lg object-cover border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => setImage(null)}
                      className="absolute -top-2 -right-2 p-1 bg-foreground text-background rounded-full hover:bg-foreground/80 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <label className="w-24 h-24 rounded-lg border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-muted-foreground transition-colors">
                    <ImagePlus className="h-6 w-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">
                      Télécharger
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>
                )}

                {/* Live Preview Card */}
                <div className="flex-1 p-3 rounded-lg border border-border bg-muted/30">
                  <p className="text-xs text-muted-foreground mb-2">Aperçu</p>
                  <div className="flex gap-3">
                    {image ? (
                      <img
                        src={image || "/placeholder.svg"}
                        alt="Preview"
                        className="w-12 h-12 rounded object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded bg-muted" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate text-foreground">
                        {nameEn || nameFr || nameAr || "Nom de l'article"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {descriptionEn ||
                          descriptionAr ||
                          descriptionFr ||
                          "Description"}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {price ? Number.parseFloat(price).toFixed(2) : "0.00"}{" "}
                        £
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Select */}
            <div className="flex flex-col gap-2">
              <label htmlFor="category">Catégorie</label>
              <Select
                value={selectedCategoryId}
                onValueChange={setSelectedCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.nameEn ||
                        cat.nameFr ||
                        cat.nameAr ||
                        "Unnamed Category"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Nom de l&apos;article</label>
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

            {/* Description  */}
            <div className="flex flex-col gap-2">
              <label htmlFor="description">
                Description{" "}
                <span className="text-muted-foreground">(optionnel)</span>
              </label>
              <Textarea
                placeholder="Description (English)"
                value={descriptionEn}
                onChange={(e) => setDescriptionEn(e.target.value)}
              />
              <Textarea
                placeholder="Description (Français)"
                value={descriptionFr}
                onChange={(e) => setDescriptionFr(e.target.value)}
              />
              <Textarea
                placeholder="الوصف (العربية)"
                dir="rtl"
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
              />
            </div>

            {/* Price */}
            <div className="flex flex-col gap-2">
              <label htmlFor="price">Price (£)</label>
              <div className="relative">
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label>Attributs</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isChefRecommendation}
                    onChange={(e) => setIsChefRecommendation(e.target.checked)}
                  />
                  Recommandé par le chef
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                  />
                  Populaire
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isSpicy}
                    onChange={(e) => setIsSpicy(e.target.checked)}
                  />
                  Épicé 🌶️
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={isVegetarian}
                    onChange={(e) => setIsVegetarian(e.target.checked)}
                  />
                  Végétarien 🥬
                </label>
              </div>
            </div>
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
              type="submit"
              className="cursor-pointer"
              disabled={
                isUploading ||
                !price ||
                !selectedCategoryId ||
                (!nameEn.trim() && !nameFr.trim() && !nameAr.trim())
              }
            >
              {item ? "Enregistrer les modifications" : "Ajouter un article"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
