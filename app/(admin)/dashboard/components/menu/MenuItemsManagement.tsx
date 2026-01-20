"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { MenuItem } from "@/lib/models/menuItem";
import { Category } from "@/lib/models/category";

import { ItemEditorModal } from "@/app/(admin)/dashboard/components/menu/item-editor-modal";
import { DeleteDialog } from "@/components/dialogs/DeleteDialog";

import { MenuItemFormData, DeleteConfirmState } from "../../lib/types";
import { MenuItemCard } from "../cards/MenuItemCard";

interface MenuItemsManagementProps {
    restaurantId: string;
    categories: Category[];
    menuItems: MenuItem[];

    onCreate: (data: MenuItemFormData & { restaurantId: string }) => void;
    onUpdate: (id: string, data: Partial<MenuItemFormData>) => void;
    onDelete: (id: string) => void;

    onUploadImage: (
        file: File,
        folder: "menu-items"
    ) => Promise<{ url: string }>;
}

export function MenuItemsManagement({
    restaurantId,
    categories,
    menuItems,
    onCreate,
    onUpdate,
    onDelete,
    onUploadImage,
}: MenuItemsManagementProps) {
    const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
    const [creatingCategoryId, setCreatingCategoryId] =
        useState<string | null>(null);

    const [deleteConfirm, setDeleteConfirm] =
        useState<DeleteConfirmState>(null);

    /** group items by category */
    const itemsByCategory = useMemo(() => {
        const map = new Map<string, MenuItem[]>();
        menuItems.forEach((item) => {
            const arr = map.get(item.categoryId) || [];
            arr.push(item);
            map.set(item.categoryId, arr);
        });
        return map;
    }, [menuItems]);

    return (
        <div className="space-y-6">
            {/* header */}
            <div>
                <h2 className="text-xl font-bold">Menu Items</h2>
                <p className="text-sm text-muted-foreground">
                    Manage your dishes and drinks
                </p>
            </div>

            {/* empty state */}
            {categories.length === 0 && (
                <Card className="p-12 text-center border-dashed">
                    <p className="text-sm text-muted-foreground">
                        You must create at least one category before adding items.
                    </p>
                </Card>
            )}

            {/* items per category */}
            <div className="space-y-5">
                {categories.map((category) => {
                    const items = itemsByCategory.get(category.id) || [];

                    return (
                        <Card key={category.id} className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold">{category.nameEn || category.nameFr || category.nameAr}</h3>

                                <Button
                                    className="cursor-pointer bg-linear-to-r from-blue-500 to-blue-700 text-white flex items-center"

                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                        setCreatingCategoryId(category.id)
                                    }
                                >
                                    <Plus size={14} />
                                    Add Item
                                </Button>
                            </div>

                            {items.length === 0 ? (
                                <p className="text-sm text-muted-foreground">
                                    No items in this category
                                </p>
                            ) : (
                                <div className="space-y-2">
                                    {items.map((item) => (
                                        <MenuItemCard
                                            key={item.id}
                                            item={item}
                                            onToggle={() =>
                                                onUpdate(item.id, {
                                                    available: !item.available,
                                                })
                                            }
                                            onEdit={() => setEditingItem(item)}
                                            onDelete={() =>
                                                setDeleteConfirm({
                                                    type: "item",
                                                    id: item.id,
                                                })
                                            }
                                        />
                                    ))}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            {/* item modal */}
            <ItemEditorModal
                open={!!editingItem || !!creatingCategoryId}
                item={editingItem}
                categoryId={
                    creatingCategoryId ||
                    editingItem?.categoryId ||
                    ""
                }
                categories={categories}
                restaurantId={restaurantId}
                onUploadImage={onUploadImage}
                onClose={() => {
                    setEditingItem(null);
                    setCreatingCategoryId(null);
                }}
                onSave={(data) => {
                    if (editingItem) {
                        onUpdate(editingItem.id, data);
                    } else {
                        onCreate({
                            ...data,
                            restaurantId,
                        });
                    }

                    setEditingItem(null);
                    setCreatingCategoryId(null);
                }}
            />

            {/* delete confirm */}
            <DeleteDialog
                open={deleteConfirm !== null}
                title="Delete item?"
                description="This item will be permanently deleted. This action cannot be undone."
                onClose={() => setDeleteConfirm(null)}
                onConfirm={() => {
                    if (deleteConfirm) {
                        onDelete(deleteConfirm.id);
                        setDeleteConfirm(null);
                    }
                }}
            />
        </div>
    );
}
