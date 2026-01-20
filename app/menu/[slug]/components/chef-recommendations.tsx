"use client";

import { type Language, PublicMenuItem } from "../lib/types";
import { translations } from "../lib/translations";
import { MenuItemCard } from "./menu-item-card";

interface ChefRecommendationsProps {
    items: PublicMenuItem[];
    language: Language;
}

export function ChefRecommendations({
    items,
    language,
}: ChefRecommendationsProps) {
    const t = translations[language];
    const isRTL = language === "ar";

    if (items.length === 0) return null;

    return (
        <section className="px-6 py-16 relative" dir={isRTL ? "rtl" : "ltr"}>
            {/* Decorative background element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-12 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {/* Section header - refined editorial style */}
            <div className="text-center mb-14">
                <span className="inline-block text-[10px] tracking-[0.5em] text-primary uppercase mb-4 px-4 py-2 border border-primary/20 rounded-full">
                    {t.curatedSelection}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground font-light mt-4">
                    {t.chefRecommendation}
                </h2>
            </div>

            {/* Horizontal scroll cards */}
            <div
                className="flex overflow-x-auto gap-5 pb-4 -mx-6 px-6 snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className="flex-shrink-0 w-[85vw] max-w-sm snap-center animate-fade-in"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <MenuItemCard item={item} language={language} variant="featured" />
                    </div>
                ))}
            </div>

            {/* Scroll indicator */}
            {items.length > 1 && (
                <div className="flex justify-center mt-6 gap-1">
                    <div className="w-6 h-0.5 bg-primary/40 rounded-full" />
                    <div className="w-2 h-0.5 bg-primary/20 rounded-full" />
                    <div className="w-2 h-0.5 bg-primary/20 rounded-full" />
                </div>
            )}
        </section>
    );
}
