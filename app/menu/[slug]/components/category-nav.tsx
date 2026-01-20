"use client";

import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { Language, PublicCategory } from "../lib/types";

interface CategoryNavProps {
    categories: PublicCategory[];
    activeCategory: string;
    onCategoryChange: (categoryId: string) => void;
    language: Language;
}

function getCategoryName(category: PublicCategory, language: Language): string {
    switch (language) {
        case "ar":
            return category.nameAr || category.nameEn || category.nameFr || "Unnamed";
        case "fr":
            return category.nameFr || category.nameEn || category.nameAr || "Unnamed";
        default:
            return category.nameEn || category.nameFr || category.nameAr || "Unnamed";
    }
}

export function CategoryNav({
    categories,
    activeCategory,
    onCategoryChange,
    language,
}: CategoryNavProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const activeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (activeRef.current && scrollRef.current) {
            const container = scrollRef.current;
            const activeButton = activeRef.current;
            const containerRect = container.getBoundingClientRect();
            const buttonRect = activeButton.getBoundingClientRect();

            const scrollLeft =
                buttonRect.left -
                containerRect.left -
                containerRect.width / 2 +
                buttonRect.width / 2 +
                container.scrollLeft;

            container.scrollTo({
                left: scrollLeft,
                behavior: "smooth",
            });
        }
    }, [activeCategory]);

    return (
        <nav className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/50">
            <div
                ref={scrollRef}
                className="flex overflow-x-auto scrollbar-hide px-4 py-4"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {categories.map((category) => {
                    const isActive = category.id === activeCategory;
                    return (
                        <button
                            key={category.id}
                            ref={isActive ? activeRef : null}
                            onClick={() => onCategoryChange(category.id)}
                            className={cn(
                                "relative px-4 py-2 whitespace-nowrap transition-all duration-300 rounded-full mx-1",
                                isActive
                                    ? "bg-primary/10 text-foreground"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            {category.icon && <span className="mr-1.5">{category.icon}</span>}
                            <span className="font-serif text-sm">
                                {getCategoryName(category, language)}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}
