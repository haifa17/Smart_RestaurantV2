"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/models/category";
import { CategoryEditor } from "@/app/(admin)/dashboard/components/menu/category-editor";
import { CategoryCard } from "../cards/CategoryCard";
import { useCategories } from "../../hooks/queries/useCategories";
import { useCategoryMutations } from "../../hooks/mutations/useCategoryMutations";
import { Plus } from "lucide-react";

export function CategoriesPage({ restaurantId }: { restaurantId: string }) {
    const { data: categories = [], isLoading } = useCategories(restaurantId);

    const { createCategory, updateCategory, deleteCategory, reorderCategories } =
        useCategoryMutations(restaurantId);

    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);

    const sortedCategories = useMemo(
        () => [...categories].sort((a, b) => a.order - b.order),
        [categories]
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Catégories</h2>
                    <p className=" text-muted-foreground mt-1" >
                        Gérez les catégories de votre menu
                    </p>
                </div>
                <Button className="cursor-pointer bg-linear-to-r from-blue-500 to-blue-700  text-white flex items-center"
                    onClick={() => setIsCreatingCategory(true)}>                                     <Plus size={14} />
                    Ajouter une catégorie</Button>
            </div>

            {/* List categories */}
            <div className="space-y-4">
                {sortedCategories.map((cat, idx) => (
                    <CategoryCard
                        key={cat.id}
                        category={cat}
                        isFirst={idx === 0}
                        isLast={idx === sortedCategories.length - 1}
                        onMove={(dir) => {
                            const newIdx = dir === "up" ? idx - 1 : idx + 1;
                            if (newIdx < 0 || newIdx >= sortedCategories.length) return;
                            const reordered = [...sortedCategories];
                            const [moved] = reordered.splice(idx, 1);
                            reordered.splice(newIdx, 0, moved);
                            reorderCategories.mutate(
                                reordered.map((c, i) => ({ id: c.id, order: i }))
                            );
                        }}
                        onToggleVis={() =>
                            updateCategory.mutate({ id: cat.id, data: { visible: !cat.visible } })
                        }
                        onEdit={() => setEditingCategory(cat)}
                        onDelete={() => deleteCategory.mutate(cat.id)}
                    />
                ))}
            </div>

            {/* Category Editor */}
            <CategoryEditor
                open={isCreatingCategory || !!editingCategory}
                category={editingCategory}
                onClose={() => {
                    setIsCreatingCategory(false);
                    setEditingCategory(null);
                }}
                onSave={(data) => {
                    if (editingCategory) {
                        updateCategory.mutate({ id: editingCategory.id, data });
                    } else {
                        createCategory.mutate(data);
                    }
                    setEditingCategory(null);
                    setIsCreatingCategory(false);
                }}
            />
        </div>
    );
}
