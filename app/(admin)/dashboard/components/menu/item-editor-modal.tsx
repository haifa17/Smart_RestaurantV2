import type React from "react";
import { useState, useEffect } from "react";
import { ImagePlus, X, Loader2, Trash2, Plus } from "lucide-react";
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
import {
  MenuItem,
  MenuItemCheese,
  MenuItemInput,
  MenuItemSauce,
} from "@/lib/models/menuItem";
import { Category } from "@/lib/models/category";
import { CheeseType, SauceType } from "@/lib/ennum";
import { CHEESE_OPTIONS, SAUCE_OPTIONS } from "./constants";

interface ItemEditorModalProps {
  open: boolean;
  onClose: () => void;
  item: MenuItem | null;
  categoryId: string;
  categories: Category[];
  onSave: (item: Omit<MenuItemInput, "id">) => void;
  onUploadImage: (file: File, folder: "menu-items") => Promise<{ url: string }>;
  restaurantId: string;
}
interface SupplementItem {
  id: string; // Temporary ID for frontend management
  name: string;
  price: string; // String for input, will convert to number on save
}

interface SupplementCategory {
  id: string; // Temporary ID for frontend management
  name: string;
  items: SupplementItem[];
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
  // Sauces state
  const [selectedSauces, setSelectedSauces] = useState<Set<SauceType>>(
    new Set(),
  );
  const [otherSauce, setOtherSauce] = useState("");
  const [hasOtherSauce, setHasOtherSauce] = useState(false);

  // Cheese state
  const [selectedCheeses, setSelectedCheeses] = useState<Set<CheeseType>>(
    new Set(),
  );
  const [otherCheese, setOtherCheese] = useState("");
  const [hasOtherCheese, setHasOtherCheese] = useState(false);
  const [supplementCategories, setSupplementCategories] = useState<
    SupplementCategory[]
  >([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

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
      // Load sauces
      if (item.sauces) {
        const sauceTypes = new Set<SauceType>();
        item.sauces.forEach((sauce) => {
          if (sauce.sauceType === SauceType.OTHER && sauce.customName) {
            setHasOtherSauce(true);
            setOtherSauce(sauce.customName);
          } else {
            sauceTypes.add(sauce.sauceType);
          }
        });
        setSelectedSauces(sauceTypes);
      }

      // Load cheeses
      if (item.cheeses) {
        const cheeseTypes = new Set<CheeseType>();
        item.cheeses.forEach((cheese) => {
          if (cheese.cheeseType === CheeseType.OTHER && cheese.customName) {
            setHasOtherCheese(true);
            setOtherCheese(cheese.customName);
          } else {
            cheeseTypes.add(cheese.cheeseType);
          }
        });
        setSelectedCheeses(cheeseTypes);
      }
      // Load supplements - group by category
      // Assuming item.supplements is an array from the database
      if (item.supplements && item.supplements.length > 0) {
        // Group supplements by category (you might need to adjust based on your data structure)
        const categoriesMap = new Map<string, SupplementItem[]>();

        item.supplements.forEach((supp: any) => {
          const category = supp.category || "Suppléments";
          if (!categoriesMap.has(category)) {
            categoriesMap.set(category, []);
          }
          categoriesMap.get(category)!.push({
            id: supp.id || `temp-${Date.now()}-${Math.random()}`,
            name: supp.name,
            price: supp.price.toString(),
          });
        });

        const loadedCategories: SupplementCategory[] = Array.from(
          categoriesMap.entries(),
        ).map(([name, items], index) => ({
          id: `cat-${index}`,
          name,
          items,
        }));

        setSupplementCategories(loadedCategories);
      }
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
      setSelectedSauces(new Set());
      setSelectedCheeses(new Set());
      setHasOtherSauce(false);
      setOtherSauce("");
      setHasOtherCheese(false);
      setOtherCheese("");
    }
  }, [item, categoryId, open]);
  const addSupplementCategory = () => {
    const trimmedName = newCategoryName.trim();
    if (!trimmedName) return;

    const newCategory: SupplementCategory = {
      id: `cat-${Date.now()}`,
      name: trimmedName,
      items: [],
    };

    setSupplementCategories([...supplementCategories, newCategory]);
    setNewCategoryName("");
    setShowAddCategory(false);
  };

  const removeSupplementCategory = (categoryId: string) => {
    setSupplementCategories(
      supplementCategories.filter((cat) => cat.id !== categoryId),
    );
  };

  const addSupplementItem = (categoryId: string) => {
    setSupplementCategories(
      supplementCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: [
              ...cat.items,
              {
                id: `item-${Date.now()}-${Math.random()}`,
                name: "",
                price: "",
              },
            ],
          };
        }
        return cat;
      }),
    );
  };

  const updateSupplementItem = (
    categoryId: string,
    itemId: string,
    field: "name" | "price",
    value: string,
  ) => {
    setSupplementCategories(
      supplementCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.map((item) =>
              item.id === itemId ? { ...item, [field]: value } : item,
            ),
          };
        }
        return cat;
      }),
    );
  };

  const removeSupplementItem = (categoryId: string, itemId: string) => {
    setSupplementCategories(
      supplementCategories.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.filter((item) => item.id !== itemId),
          };
        }
        return cat;
      }),
    );
  };

  const toggleSauce = (sauceType: SauceType) => {
    const newSet = new Set(selectedSauces);
    if (newSet.has(sauceType)) {
      newSet.delete(sauceType);
    } else {
      newSet.add(sauceType);
    }
    setSelectedSauces(newSet);
  };

  const toggleCheese = (cheeseType: CheeseType) => {
    const newSet = new Set(selectedCheeses);
    if (newSet.has(cheeseType)) {
      newSet.delete(cheeseType);
    } else {
      newSet.add(cheeseType);
    }
    setSelectedCheeses(newSet);
  };
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
    // Build sauces array
    const sauces: Omit<
      MenuItemSauce,
      "id" | "menuItemId" | "createdAt" | "updatedAt"
    >[] = [];
    selectedSauces.forEach((sauceType) => {
      sauces.push({
        sauceType,
        isIncluded: true,
      });
    });
    if (hasOtherSauce && otherSauce.trim()) {
      sauces.push({
        sauceType: SauceType.OTHER,
        customName: otherSauce.trim(),
        isIncluded: true,
      });
    }
    // Build cheeses array
    const cheeses: Omit<
      MenuItemCheese,
      "id" | "menuItemId" | "createdAt" | "updatedAt"
    >[] = [];
    selectedCheeses.forEach((cheeseType) => {
      cheeses.push({
        cheeseType,
        isIncluded: true,
      });
    });
    if (hasOtherCheese && otherCheese.trim()) {
      cheeses.push({
        cheeseType: CheeseType.OTHER,
        customName: otherCheese.trim(),
        isIncluded: true,
      });
    }
    // Build supplements array - flatten categories and items
    const supplements: Array<{
      name: string;
      category: string;
      price: number;
      isAvailable: boolean;
    }> = [];

    supplementCategories.forEach((category) => {
      category.items.forEach((item) => {
        if (item.name.trim() && item.price) {
          const priceNum = parseFloat(item.price);
          if (!isNaN(priceNum) && priceNum >= 0) {
            supplements.push({
              name: item.name.trim(),
              category: category.name,
              price: priceNum,
              isAvailable: true,
            });
          }
        }
      });
    });
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
      sauces,
      cheeses,
      supplements,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {item ? "Modifier l'article" : "Ajouter un article"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4 ">
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
                    <p className="font-medium text-sm  text-foreground line-clamp-1">
                      {nameEn || nameFr || nameAr || "Nom de l'article"}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2 ">
                      {descriptionEn ||
                        descriptionAr ||
                        descriptionFr ||
                        "Description"}
                    </p>
                    <p className="text-sm font-medium text-foreground mt-0.5">
                      {price ? Number.parseFloat(price).toFixed(2) : "0.00"} EUR
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
              rows={3}
            />
            <Textarea
              placeholder="Description (Français)"
              value={descriptionFr}
              onChange={(e) => setDescriptionFr(e.target.value)}
              rows={3}
            />
            <Textarea
              placeholder="الوصف (العربية)"
              dir="rtl"
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              rows={3}
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price (EUR)</label>
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
          {/* Sauces */}
          <div className="flex flex-col gap-2">
            <label>Sauces disponibles</label>
            <div className="grid grid-cols-2 gap-2 p-3 rounded-lg border border-border bg-muted/30">
              {SAUCE_OPTIONS.map((sauce) => (
                <label
                  key={sauce.type}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedSauces.has(sauce.type)}
                    onChange={() => toggleSauce(sauce.type)}
                    className="cursor-pointer"
                  />
                  {sauce.label}
                </label>
              ))}
            </div>

            {/* Other Sauce Input */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={hasOtherSauce}
                  onChange={(e) => {
                    setHasOtherSauce(e.target.checked);
                    if (!e.target.checked) {
                      setOtherSauce("");
                    }
                  }}
                  className="cursor-pointer"
                />
                Autre sauce
              </label>
              {hasOtherSauce && (
                <Input
                  placeholder="Nom de la sauce personnalisée (ex: Sauce Harissa)"
                  value={otherSauce}
                  onChange={(e) => setOtherSauce(e.target.value)}
                  className="ml-6"
                />
              )}
            </div>
          </div>

          {/* Cheeses */}
          <div className="flex flex-col gap-2">
            <label>Fromages disponibles</label>
            <div className="grid grid-cols-2 gap-2 p-3 rounded-lg border border-border bg-muted/30">
              {CHEESE_OPTIONS.map((cheese) => (
                <label
                  key={cheese.type}
                  className="flex items-center gap-2 text-sm cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCheeses.has(cheese.type)}
                    onChange={() => toggleCheese(cheese.type)}
                    className="cursor-pointer"
                  />
                  {cheese.label}
                </label>
              ))}
            </div>

            {/* Other Cheese Input */}
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={hasOtherCheese}
                  onChange={(e) => {
                    setHasOtherCheese(e.target.checked);
                    if (!e.target.checked) {
                      setOtherCheese("");
                    }
                  }}
                  className="cursor-pointer"
                />
                Autre fromage
              </label>
              {hasOtherCheese && (
                <Input
                  placeholder="Nom du fromage personnalisé (ex: Comté affiné)"
                  value={otherCheese}
                  onChange={(e) => setOtherCheese(e.target.value)}
                  className="ml-6"
                />
              )}
            </div>
          </div>
          {/* ============================================ */}
          {/* SUPPLEMENTS SECTION - NEW */}
          {/* ============================================ */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label>Suppléments disponibles</label>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setShowAddCategory(true)}
                className="cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-1" />
                Ajouter une catégorie
              </Button>
            </div>

            {/* Add Category Input */}
            {showAddCategory && (
              <div className="flex gap-2 p-3 rounded-lg border border-border bg-blue-50">
                <Input
                  placeholder="Nom de la catégorie (ex: Viandes, Fromages, etc.)"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSupplementCategory();
                    }
                  }}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={addSupplementCategory}
                  className="cursor-pointer"
                >
                  Ajouter
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setShowAddCategory(false);
                    setNewCategoryName("");
                  }}
                  className="cursor-pointer"
                >
                  Annuler
                </Button>
              </div>
            )}

            {/* Supplement Categories */}
            {supplementCategories.length > 0 && (
              <div className="space-y-4">
                {supplementCategories.map((category) => (
                  <div
                    key={category.id}
                    className="p-4 rounded-lg border border-border bg-muted/30"
                  >
                    {/* Category Header */}
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-sm">{category.name}</h4>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => addSupplementItem(category.id)}
                          className="cursor-pointer"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Ajouter un article
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          onClick={() => removeSupplementCategory(category.id)}
                          className="cursor-pointer text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Supplement Items */}
                    {category.items.length > 0 ? (
                      <div className="space-y-2">
                        {category.items.map((item) => (
                          <div key={item.id} className="flex gap-2 items-start">
                            <Input
                              placeholder="Nom (ex: Bacon)"
                              value={item.name}
                              onChange={(e) =>
                                updateSupplementItem(
                                  category.id,
                                  item.id,
                                  "name",
                                  e.target.value,
                                )
                              }
                              className="flex-1"
                            />
                            <Input
                              placeholder="Prix (EUR)"
                              type="number"
                              step="0.01"
                              min="0"
                              value={item.price}
                              onChange={(e) =>
                                updateSupplementItem(
                                  category.id,
                                  item.id,
                                  "price",
                                  e.target.value,
                                )
                              }
                              className="w-32"
                            />
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                removeSupplementItem(category.id, item.id)
                              }
                              className="cursor-pointer text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Aucun article dans cette catégorie
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {supplementCategories.length === 0 && !showAddCategory && (
              <p className="text-sm text-muted-foreground italic p-3 rounded-lg border border-border bg-muted/30">
                Aucun supplément configuré. Cliquez sur "Ajouter une catégorie"
                pour commencer.
              </p>
            )}
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
            onClick={handleSubmit}
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
      </DialogContent>
    </Dialog>
  );
}
