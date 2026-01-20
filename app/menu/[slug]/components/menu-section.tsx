"use client";

import { translations } from "../lib/translations";
import { MenuItemCard } from "./menu-item-card";
import { type Language, PublicCategory } from "../lib/types";

interface MenuSectionProps {
    category: PublicCategory;
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

export function MenuSection({ category, language }: MenuSectionProps) {
    const name = getCategoryName(category, language);
    const t = translations[language];
    const isRTL = language === "ar";

    return (
        <section
            id={category.id}
            className="px-6 py-14 scroll-mt-16"
            dir={isRTL ? "rtl" : "ltr"}
        >
            {/* Section header - elegant style */}
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                    <div className="h-px flex-1 bg-border/50" />
                    <h2 className="font-serif text-2xl md:text-3xl text-foreground font-light tracking-wide">
                        {category.icon && <span className="mr-2">{category.icon}</span>}
                        {name}
                    </h2>
                    <div className="h-px flex-1 bg-border/50" />
                </div>
                <p className="text-center text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
                    {category.items.length} {t.items}
                </p>
            </div>

            {/* Menu items list */}
            <div className="max-w-2xl mx-auto">
                {category.items.map((item, index) => (
                    <div
                        key={item.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 30}ms` }}
                    >
                        <MenuItemCard item={item} language={language} />
                    </div>
                ))}
            </div>
        </section>
    );
}
