// Types for public menu data
export interface PublicMenuItem {
    id: string;
    nameEn: string | null;
    nameFr: string | null;
    nameAr: string | null;
    descriptionEn: string | null;
    descriptionFr: string | null;
    descriptionAr: string | null;
    price: number;
    image: string | null;
    isChefRecommendation: boolean;
    isPopular: boolean;
    isSpicy: boolean;
    isVegetarian: boolean;
}

export interface PublicCategory {
    id: string;
    nameEn: string | null;
    nameFr: string | null;
    nameAr: string | null;
    icon: string | null;
    order: number;
    items: PublicMenuItem[];
}

export interface PublicSchedule {
    dayOfWeek: string;
    opensAt: string;
    closesAt: string;
    isClosed: boolean;
}

export interface PublicRestaurant {
    id: string;
    slug: string;
    name: string;
    phone: string | null;
    logo: string | null;
    heroImage: string | null;
    tagline: string | null;
    description: string | null;
    schedules: PublicSchedule[];
}

export interface PublicMenuData {
    restaurant: PublicRestaurant;
    categories: PublicCategory[];
}

export type Language = "en" | "fr" | "ar";
