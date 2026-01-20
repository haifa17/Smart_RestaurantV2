"use client";

import { Star, Flame, Leaf, ChefHat } from "lucide-react";
import { type Language, PublicMenuItem } from "../lib/types";

interface MenuItemCardProps {
    item: PublicMenuItem;
    language: Language;
    variant?: "default" | "featured";
}

function getItemName(item: PublicMenuItem, language: Language): string {
    switch (language) {
        case "ar":
            return item.nameAr || item.nameEn || item.nameFr || "Unnamed";
        case "fr":
            return item.nameFr || item.nameEn || item.nameAr || "Unnamed";
        default:
            return item.nameEn || item.nameFr || item.nameAr || "Unnamed";
    }
}

function getItemDescription(
    item: PublicMenuItem,
    language: Language
): string | null {
    switch (language) {
        case "ar":
            return item.descriptionAr || item.descriptionEn || item.descriptionFr;
        case "fr":
            return item.descriptionFr || item.descriptionEn || item.descriptionAr;
        default:
            return item.descriptionEn || item.descriptionFr || item.descriptionAr;
    }
}

function formatPrice(price: number): string {
    return price.toFixed(2);
}

export function MenuItemCard({
    item,
    language,
    variant = "default",
}: MenuItemCardProps) {
    const name = getItemName(item, language);
    const description = getItemDescription(item, language);
    const isRTL = language === "ar";

    if (variant === "featured") {
        return (
            <div
                className={`group relative bg-card rounded-2xl overflow-hidden border border-border/30 shadow-sm hover:shadow-md transition-shadow ${isRTL ? "text-right" : ""
                    }`}
            >
                {/* Image */}
                {item.image && (
                    <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                        <img
                            src={item.image}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

                        {/* Chef badge - positioned top right */}
                        {item.isChefRecommendation && (
                            <div className={`absolute top-4 ${isRTL ? "left-4" : "right-4"}`}>
                                <span className="flex items-center gap-1.5 text-[10px] tracking-wider text-primary-foreground bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full uppercase font-medium">
                                    <ChefHat className="h-3 w-3" />
                                    Chef
                                </span>
                            </div>
                        )}
                    </div>
                )}

                {/* Content */}
                <div className="p-6">
                    <div
                        className={`flex items-start justify-between gap-3 mb-3 ${isRTL ? "flex-row-reverse" : ""
                            }`}
                    >
                        <h3 className="font-serif text-xl text-foreground leading-tight">
                            {name}
                        </h3>
                    </div>

                    {description && (
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                            {description}
                        </p>
                    )}

                    {/* Price and tags row */}
                    <div
                        className={`flex items-center justify-between pt-4 border-t border-border/30 ${isRTL ? "flex-row-reverse" : ""
                            }`}
                    >
                        <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                            {item.isPopular && (
                                <Star className="h-3.5 w-3.5 text-primary fill-primary" />
                            )}
                            {item.isSpicy && (
                                <Flame className="h-3.5 w-3.5 text-orange-500" />
                            )}
                            {item.isVegetarian && (
                                <Leaf className="h-3.5 w-3.5 text-green-600" />
                            )}
                        </div>
                        <span className="text-xl font-serif text-primary font-medium">
                            {formatPrice(item.price)} TND
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Default variant
    return (
        <div
            className={`group flex gap-5 py-5 border-b border-border/30 transition-all duration-300 hover:bg-muted/30 -mx-4 px-4 rounded-lg ${isRTL ? "flex-row-reverse text-right" : ""
                }`}
        >
            {/* Image */}
            {item.image && (
                <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl bg-muted">
                    <img
                        src={item.image}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div
                    className={`flex items-start justify-between gap-3 ${isRTL ? "flex-row-reverse" : ""
                        }`}
                >
                    <div className="flex-1">
                        <h3 className="font-serif text-lg text-foreground leading-tight group-hover:text-primary transition-colors">
                            {name}
                        </h3>
                        {description && (
                            <p className="text-sm text-muted-foreground mt-1 leading-relaxed line-clamp-2">
                                {description}
                            </p>
                        )}
                    </div>

                    <span className="text-lg font-serif text-primary font-medium whitespace-nowrap">
                        {formatPrice(item.price)} TND
                    </span>
                </div>

                {/* Tags */}
                {(item.isPopular || item.isSpicy || item.isVegetarian) && (
                    <div className={`flex items-center gap-2 mt-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                        {item.isPopular && (
                            <Star className="h-3 w-3 text-primary fill-primary" />
                        )}
                        {item.isSpicy && <Flame className="h-3 w-3 text-orange-500" />}
                        {item.isVegetarian && <Leaf className="h-3 w-3 text-green-600" />}
                    </div>
                )}
            </div>
        </div>
    );
}
