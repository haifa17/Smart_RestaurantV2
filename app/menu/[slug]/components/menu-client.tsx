"use client";

import { useState, useCallback, useEffect } from "react";
import { PublicMenuData, Language } from "../lib/types";
import { Header } from "./header.";
import { CategoryNav } from "./category-nav";
import { ChefRecommendations } from "./chef-recommendations";
import { MenuSection } from "./menu-section";
import { EmptyState } from "./empty-state";
import { Footer } from "./footer";
import { SplashScreen } from "./splash-screen";
import { useMenuFiltering } from "../hooks/use-menu-filtering";
import { useCategoryScrollSpy } from "../hooks/use-category-scroll-spy";

interface MenuClientProps {
    menuData: PublicMenuData;
}

export function MenuClient({ menuData }: MenuClientProps) {
    const [showSplash, setShowSplash] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>("");
    const [language, setLanguage] = useState<Language>("en");

    const handleSplashComplete = useCallback(() => setShowSplash(false), []);
    const handleSearchToggle = useCallback(
        () => setIsSearchOpen((prev) => !prev),
        []
    );

    const handleCategoryChange = useCallback((categoryId: string) => {
        setActiveCategory(categoryId);
    }, []);

    const handleCategoryClick = useCallback((categoryId: string) => {
        const section = document.getElementById(categoryId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setActiveCategory(categoryId);
    }, []);

    const handleLanguageChange = useCallback((lang: Language) => {
        setLanguage(lang);
    }, []);

    // Set initial active category
    useEffect(() => {
        if (menuData.categories.length > 0 && !activeCategory) {
            setActiveCategory(menuData.categories[0].id);
        }
    }, [menuData.categories, activeCategory]);

    // Filter menu data
    const { chefRecommendations, filteredCategories } = useMenuFiltering(
        menuData.categories,
        searchQuery
    );

    // Track active category on scroll
    useCategoryScrollSpy(filteredCategories, handleCategoryChange);

    const hasResults = filteredCategories.length > 0;
    const showChefRecommendations =
        !searchQuery && chefRecommendations.length > 0;

    if (showSplash) {
        return (
            <SplashScreen
                onComplete={handleSplashComplete}
                restaurant={menuData.restaurant}
            />
        );
    }

    return (
        <div className="min-h-screen bg-background relative">
            <Header
                restaurant={menuData.restaurant}
                language={language}
                onLanguageChange={handleLanguageChange}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isSearchOpen={isSearchOpen}
                onSearchToggle={handleSearchToggle}
            />

            {hasResults && (
                <CategoryNav
                    categories={filteredCategories}
                    activeCategory={activeCategory}
                    onCategoryChange={handleCategoryClick}
                    language={language}
                />
            )}

            <main className="pb-20">
                {showChefRecommendations && (
                    <ChefRecommendations items={chefRecommendations} language={language} />
                )}

                {hasResults ? (
                    filteredCategories.map((category) => (
                        <MenuSection
                            key={category.id}
                            category={category}
                            language={language}
                        />
                    ))
                ) : (
                    <EmptyState language={language} />
                )}
            </main>

            <Footer restaurant={menuData.restaurant} language={language} />
        </div>
    );
}
