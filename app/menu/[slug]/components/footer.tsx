"use client";

import { type Language, PublicRestaurant } from "../lib/types";
import { translations } from "../lib/translations";

interface FooterProps {
    restaurant: PublicRestaurant;
    language: Language;
}

export function Footer({ restaurant, language }: FooterProps) {
    const t = translations[language];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-20 text-center border-t border-border/50 bg-muted/30">
            {/* Logo */}
            <div className="w-20 h-20 mx-auto mb-5 relative opacity-50">
                {restaurant.logo ? (
                    <img
                        src={restaurant.logo}
                        alt={restaurant.name}
                        className="w-full h-full object-contain"
                    />
                ) : (
                    <div className="w-full h-full rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-2xl font-bold text-primary/50">
                            {restaurant.name.charAt(0)}
                        </span>
                    </div>
                )}
            </div>

            {/* Tagline */}
            {restaurant.tagline && (
                <p className="text-[10px] tracking-[0.4em] text-muted-foreground uppercase">
                    {restaurant.tagline}
                </p>
            )}

            {/* Copyright */}
            <p className="text-[9px] tracking-wider text-muted-foreground/60 mt-3">
                © {currentYear} {restaurant.name}
            </p>

            {/* Powered by */}
            <p className="text-[8px] tracking-wider text-muted-foreground/40 mt-2">
                {t.poweredBy}
            </p>
        </footer>
    );
}
