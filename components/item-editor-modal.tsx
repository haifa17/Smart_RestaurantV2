"use client";

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
}

export function ItemEditorModal({
  open,
  onClose,
  item,
  categoryId,
  categories,
  onSave,
  onUploadImage,
}: ItemEditorModalProps) {
  const [nameAr, setNameAr] = useState("");
  const [name, setname] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionFr, setDescriptionFr] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (item) {
      setname(item.name || "");
      setDescriptionAr(item.descriptionAr || "");
      setDescriptionFr(item.descriptionFr || "");
      setPrice(item.price.toString());
      setImage(item.image || null);
      setSelectedCategoryId(item.categoryId);
    } else {
      setNameAr("");
      setname("");
      setDescriptionAr("");
      setDescriptionFr("");
      setPrice("");
      setImage(null);
      setSelectedCategoryId(categoryId);
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
    if (nameAr.trim() && name.trim() && price && selectedCategoryId) {
      onSave({
        categoryId: selectedCategoryId,
        nameAr: nameAr.trim(),
        name: name.trim(),
        descriptionAr: descriptionAr.trim() || undefined,
        descriptionFr: descriptionFr.trim() || undefined,
        price: Number.parseFloat(price),
        image,
        available: true,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Item" : "Add Item"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
            {/* Image Upload */}
            <div className="space-y-2">
              <label>Item Image</label>
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
                      Upload
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
                  <p className="text-xs text-muted-foreground mb-2">
                    Preview (French)
                  </p>
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
                        {name || "Item name"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {descriptionFr || "Description"}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-0.5">
                        {price ? Number.parseFloat(price).toFixed(2) : "0.00"}{" "}
                        TND
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label htmlFor="category">Category</label>
              <Select
                value={selectedCategoryId}
                onValueChange={setSelectedCategoryId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name || cat.name || "Unnamed Category"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Name Arabic */}
            <div className="space-y-2">
              <label htmlFor="name-ar">Item Name (Arabic)</label>
              <Input
                id="name-ar"
                placeholder="مثال: بيتزا مارغريتا"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                dir="rtl"
              />
            </div>

            {/* Name French */}
            <div className="space-y-2">
              <label htmlFor="name-fr">Item Name (French)</label>
              <Input
                id="name-fr"
                placeholder="e.g., Pizza Margherita"
                value={name}
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            {/* Description Arabic */}
            <div className="space-y-2">
              <label htmlFor="description-ar">
                Description (Arabic){" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                id="description-ar"
                placeholder="وصف مختصر للطبق..."
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                dir="rtl"
                rows={2}
              />
            </div>

            {/* Description French */}
            <div className="space-y-2">
              <label htmlFor="description-fr">
                Description (French){" "}
                <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                id="description-fr"
                placeholder="A brief description of the item..."
                value={descriptionFr}
                onChange={(e) => setDescriptionFr(e.target.value)}
                rows={2}
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <label htmlFor="price">Price (TND)</label>
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
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !nameAr.trim() ||
                !name.trim() ||
                !price ||
                !selectedCategoryId ||
                isUploading
              }
            >
              {item ? "Save Changes" : "Add Item"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
