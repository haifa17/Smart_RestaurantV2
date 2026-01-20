import { useMemo } from "react";
import type { PublicCategory, PublicMenuItem } from "../lib/types";

/**
 * Filters menu items based on search query
 */
function filterMenuItems(items: PublicMenuItem[], query: string): PublicMenuItem[] {
    if (!query.trim()) return items;

    const normalizedQuery = query.toLowerCase();

    return items.filter((item) => {
        const searchableText = [
            item.nameEn,
            item.nameFr,
            item.nameAr,
            item.descriptionEn,
            item.descriptionFr,
            item.descriptionAr,
        ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        return searchableText.includes(normalizedQuery);
    });
}

/**
 * Combines categories with their filtered items
 */
function buildFilteredCategories(
    categories: PublicCategory[],
    searchQuery: string
): PublicCategory[] {
    return categories
        .map((category) => {
            const filteredItems = filterMenuItems(category.items, searchQuery);
            return {
                ...category,
                items: filteredItems,
            };
        })
        .filter((category) => category.items.length > 0);
}

/**
 * Hook to filter and organize menu data
 */
export function useMenuFiltering(
    categories: PublicCategory[],
    searchQuery: string
) {
    return useMemo(() => {
        // Get chef recommendations from all categories
        const chefRecommendations = categories
            .flatMap((cat) => cat.items)
            .filter((item) => item.isChefRecommendation);

        // Build filtered categories
        const filteredCategories = buildFilteredCategories(categories, searchQuery);

        return {
            chefRecommendations,
            filteredCategories,
        };
    }, [categories, searchQuery]);
}
