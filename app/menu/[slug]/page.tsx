import { notFound } from "next/navigation";
import { Metadata } from "next";
import { MenuClient } from "./components/menu-client";
import { PublicMenuData } from "./lib/types";

// Fetch menu data on the server
async function getMenuData(slug: string): Promise<PublicMenuData | null> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    try {
        const response = await fetch(`${baseUrl}/api/public/menu/${slug}`, {
            next: { revalidate: 60 }, // Revalidate every 60 seconds
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error("Error fetching menu data:", error);
        return null;
    }
}

// Generate metadata for SEO
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const menuData = await getMenuData(slug);

    if (!menuData) {
        return {
            title: "Menu Not Found",
        };
    }

    return {
        title: `${menuData.restaurant.name} - Menu`,
        description: menuData.restaurant.tagline || `View the menu of ${menuData.restaurant.name}`,
        openGraph: {
            title: `${menuData.restaurant.name} - Menu`,
            description: menuData.restaurant.tagline || `View the menu of ${menuData.restaurant.name}`,
            images: menuData.restaurant.heroImage ? [menuData.restaurant.heroImage] : [],
        },
    };
}

export default async function PublicMenuPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const menuData = await getMenuData(slug);

    if (!menuData) {
        notFound();
    }

    return <MenuClient menuData={menuData} />;
}
