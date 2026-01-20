"use client";

import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Language } from "../lib/types";
import { translations } from "../lib/translations";
import { cn } from "@/lib/utils";
import { PublicRestaurant } from "../lib/types";

interface HeaderProps {
    restaurant: PublicRestaurant;
    language: Language;
    onLanguageChange: (lang: Language) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    isSearchOpen: boolean;
    onSearchToggle: () => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "fr", label: "FR" },
    { code: "ar", label: "AR" },
];

export function Header({
    restaurant,
    language,
    onLanguageChange,
    searchQuery,
    onSearchChange,
    isSearchOpen,
    onSearchToggle,
}: HeaderProps) {
    const t = translations[language];

    return (
        <header className="relative z-50">
            <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-16 relative overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute top-20 left-10 w-40 h-40 rounded-full border border-foreground" />
                    <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full border border-foreground" />
                    <div className="absolute top-40 right-20 w-16 h-16 rounded-full border border-foreground" />
                </div>

                {/* Hero Image Background */}
                {restaurant.heroImage && (
                    <div className="absolute inset-0 -z-10">
                        <img
                            src={restaurant.heroImage}
                            alt={restaurant.name}
                            className="w-full h-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
                    </div>
                )}

                {/* Top bar with controls */}
                <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-5">
                    {/* Language Toggle */}
                    <div className="flex items-center gap-2">
                        {LANGUAGES.map((lang, index) => (
                            <div key={lang.code} className="flex items-center">
                                <button
                                    onClick={() => onLanguageChange(lang.code)}
                                    className={cn(
                                        "text-xs tracking-[0.15em] transition-colors hover:text-foreground",
                                        language === lang.code
                                            ? "text-foreground font-medium"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {lang.label}
                                </button>
                                {index < LANGUAGES.length - 1 && (
                                    <span className="text-muted-foreground/30 mx-2">/</span>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex items-center gap-1">
                        {/* Search Toggle */}
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onSearchToggle}
                            className="h-10 w-10 text-muted-foreground hover:text-foreground rounded-full"
                            aria-label="Search"
                        >
                            <Search className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Logo and Restaurant Info */}
                <div className="text-center animate-fade-in">
                    {/* Logo */}
                    <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                        {restaurant.logo ? (
                            <img
                                src={restaurant.logo}
                                alt={`${restaurant.name} logo`}
                                className="w-full h-full object-contain rounded-2xl"
                            />
                        ) : (
                            <div className="w-full h-full rounded-2xl bg-primary/10 flex items-center justify-center">
                                <span className="text-4xl md:text-5xl font-bold text-primary">
                                    {restaurant.name.charAt(0)}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Restaurant Name */}
                    <h1 className="font-serif text-3xl md:text-4xl text-foreground font-light tracking-wide mb-4">
                        {restaurant.name}
                    </h1>

                    {/* Tagline */}
                    {restaurant.tagline && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-8 h-px bg-primary/60" />
                                <p className="text-[11px] tracking-[0.4em] text-muted-foreground uppercase">
                                    {restaurant.tagline}
                                </p>
                                <div className="w-8 h-px bg-primary/60" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Decorative floating circles */}
                <div
                    className="absolute top-1/3 left-6 w-24 h-24 border border-primary/10 rounded-full animate-pulse"
                    style={{ animationDuration: "4s" }}
                />
                <div
                    className="absolute bottom-1/3 right-8 w-20 h-20 border border-primary/10 rounded-full animate-pulse"
                    style={{ animationDuration: "5s" }}
                />
            </div>

            {/* Search overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[100] bg-background/98 backdrop-blur-xl transition-all duration-500",
                    isSearchOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                )}
            >
                <div className="flex flex-col items-center justify-center min-h-screen px-6">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onSearchToggle}
                        className="absolute top-6 right-6 h-12 w-12 rounded-full"
                    >
                        <X className="h-5 w-5" />
                    </Button>

                    <div className="w-full max-w-md">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder={t.search}
                                className="w-full h-14 pl-12 pr-4 text-lg bg-muted/50 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                                autoFocus
                            />
                        </div>
                        {searchQuery && (
                            <button
                                onClick={() => onSearchChange("")}
                                className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
