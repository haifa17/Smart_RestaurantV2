
import { useState, useMemo, useCallback } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Category } from "@/lib/models/category";
import { MenuItem } from "@/lib/models/menuItem";
import {
  CategoryFormData,
  DeleteConfirmState,
  MenuItemFormData,
} from "../lib/types";
import { CategoryCard } from "./cards/CategoryCard";
import { CategoryEditor } from "@/components/category-editor";
import { ItemEditorModal } from "@/components/item-editor-modal";

interface MenuManagementProps {
  categories: Category[];
  menuItems: MenuItem[];
  isLoading: boolean;
  onCreateCategory: (data: CategoryFormData) => void;
  onUpdateCategory: (
    id: string,
    data: Partial<CategoryFormData> & { visible?: boolean }
  ) => void;
  onDeleteCategory: (id: string) => void;
  onReorderCategories: (
    categories: Array<{ id: string; order: number }>
  ) => void;
  onCreateMenuItem: (data: MenuItemFormData) => void;
  onUpdateMenuItem: (id: string, data: Partial<MenuItemFormData>) => void;
  onDeleteMenuItem: (id: string) => void;
  onUploadImage: (file: File, folder: "menu-items") => Promise<{ url: string }>;
}

export function MenuManagement({
  categories,
  menuItems,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
  onReorderCategories,
  onCreateMenuItem,
  onUpdateMenuItem,
  onDeleteMenuItem,
  onUploadImage,
}: MenuManagementProps) {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isCreatingItem, setIsCreatingItem] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<DeleteConfirmState>(null);

  const sorted = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );

  const itemsMap = useMemo(() => {
    const map = new Map();
    menuItems.forEach((item) => {
      const arr = map.get(item.categoryId) || [];
      arr.push(item);
      map.set(item.categoryId, arr);
    });
    return map;
  }, [menuItems]);

  const moveCategory = useCallback(
    (idx: number, dir: "up" | "down") => {
      const newIdx = dir === "up" ? idx - 1 : idx + 1;
      if (newIdx < 0 || newIdx >= sorted.length) return;
      const reordered = [...sorted];
      const [moved] = reordered.splice(idx, 1);
      reordered.splice(newIdx, 0, moved);
      onReorderCategories(reordered.map((c, i) => ({ id: c.id, order: i })));
    },
    [sorted, onReorderCategories]
  );

  const handleSaveCat = useCallback(
    (data: CategoryFormData) => {
      if (editingCategory) {
        onUpdateCategory(editingCategory.id, data);
        setEditingCategory(null);
      } else {
        onCreateCategory(data);
        setIsCreatingCategory(false);
      }
    },
    [editingCategory, onUpdateCategory, onCreateCategory]
  );

  const handleSaveItem = useCallback(
    (item: MenuItemFormData) => {
      if (editingItem) {
        onUpdateMenuItem(editingItem.id, item);
        setEditingItem(null);
      } else {
        onCreateMenuItem(item);
        setIsCreatingItem(false);
        setSelectedCategoryId(null);
      }
    },
    [editingItem, onUpdateMenuItem, onCreateMenuItem]
  );

  const handleDelete = useCallback(() => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === "category") {
      onDeleteCategory(deleteConfirm.id);
    } else {
      onDeleteMenuItem(deleteConfirm.id);
    }
    setDeleteConfirm(null);
  }, [deleteConfirm, onDeleteCategory, onDeleteMenuItem]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Menu</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage categories and items
          </p>
        </div>
        <Button
          className="cursor-pointer border"
          onClick={() => setIsCreatingCategory(true)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Category
        </Button>
      </div>

      {sorted.length === 0 ? (
        <Card className="p-12 text-center">
          <h3 className="font-medium mb-1">No categories yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first category
          </p>
          <Button onClick={() => setIsCreatingCategory(true)} variant="outline">
            Add Category
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {sorted.map((cat, idx) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              items={itemsMap.get(cat.id) || []}
              isFirst={idx === 0}
              isLast={idx === sorted.length - 1}
              onMove={(dir) => moveCategory(idx, dir)}
              onToggleVis={() =>
                onUpdateCategory(cat.id, { visible: !cat.visible })
              }
              onEdit={() => setEditingCategory(cat)}
              onDelete={() =>
                setDeleteConfirm({ type: "category", id: cat.id })
              }
              onAddItem={() => {
                setSelectedCategoryId(cat.id);
                setIsCreatingItem(true);
              }}
              onItemToggle={(id) => {
                const item = menuItems.find((i) => i.id === id);
                if (item) onUpdateMenuItem(id, { available: !item.available });
              }}
              onItemEdit={setEditingItem}
              onItemDelete={(id) => setDeleteConfirm({ type: "item", id })}
            />
          ))}
        </div>
      )}

      <CategoryEditor
        open={isCreatingCategory || editingCategory !== null}
        onClose={() => {
          setIsCreatingCategory(false);
          setEditingCategory(null);
        }}
        category={editingCategory}
        onSave={handleSaveCat}
      />

      <ItemEditorModal
        open={isCreatingItem || editingItem !== null}
        onClose={() => {
          setIsCreatingItem(false);
          setEditingItem(null);
          setSelectedCategoryId(null);
        }}
        item={editingItem}
        categoryId={selectedCategoryId || editingItem?.categoryId || ""}
        categories={categories}
        onSave={handleSaveItem}
        onUploadImage={onUploadImage}
      />

      <AlertDialog
        open={deleteConfirm !== null}
        onOpenChange={() => setDeleteConfirm(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteConfirm?.type === "category" ? "Category" : "Item"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirm?.type === "category"
                ? "This will delete the category and all items. Cannot be undone."
                : "This will permanently delete this item. Cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
