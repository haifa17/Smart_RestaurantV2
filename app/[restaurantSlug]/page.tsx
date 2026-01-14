import { notFound } from "next/navigation"
import { HeroBanner } from "./components/hero-banner"

interface RestaurantPageProps {
  params: Promise<{
    restaurantSlug: string
  }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurantSlug } = await params

  try {
    // const { restaurant, categories, menuItems, storyCards } = await getMenuData(restaurantSlug)

    return (
      <div className="min-h-screen">
        {/* <LanguageToggle /> */}
        {/* <HeroBanner restaurant={restaurant} /> */}
        {/* <StorySection storyCards={storyCards} />
        <MenuSection
          categories={categories}
          menuItems={menuItems}
        />
        <Footer restaurant={restaurant} /> */}
      </div>
    )
  } catch (error) {
    console.error(`Error loading menu for ${restaurantSlug}:`, error)
    notFound()
  }
}