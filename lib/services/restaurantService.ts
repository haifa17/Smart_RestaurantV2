import { prisma } from "@/lib/prsima-simple";
import { generateSlug } from "@/lib/utils";

/**
 * Create a restaurant for a new user
 * Called when a user signs up via Clerk webhook
 */
export async function createRestaurantForUser(
    clerkUserId: string,
    email: string,
    firstName?: string | null
): Promise<{ id: string; name: string; slug: string }> {
    try {
        const restaurantName =
            firstName || email.split("@")[0] || "My Restaurant";
        // Make slug unique by including userId
        const userIdShort = clerkUserId.substring(0, 8);
        const slug = generateSlug(`${restaurantName}-${userIdShort}`);

        const restaurant = await prisma.restaurant.create({
            data: {
                name: restaurantName,
                slug,
                tagline: `Welcome to ${restaurantName}`,
            },
        });

        console.log(
            `✅ Restaurant created for user ${clerkUserId}:`,
            restaurant.id
        );

        return {
            id: restaurant.id,
            name: restaurant.name,
            slug: restaurant.slug,
        };
    } catch (error) {
        console.error(
            `❌ Error creating restaurant for user ${clerkUserId}:`,
            error
        );
        throw error;
    }
}

/**
 * Get or create a restaurant for a user
 * Used by dashboard to fetch user's restaurant
 */
export async function getOrCreateRestaurant(
    clerkUserId: string,
    email: string,
    firstName?: string | null
): Promise<{ id: string; name: string; slug: string }> {
    try {
        const userIdShort = clerkUserId.substring(0, 8);
        const restaurantName =
            firstName || email.split("@")[0] || "My Restaurant";
        const slug = generateSlug(`${restaurantName}-${userIdShort}`);

        // Try to find existing restaurant by slug
        const existingRestaurant = await prisma.restaurant.findUnique({
            where: { slug },
            select: {
                id: true,
                name: true,
                slug: true,
            },
        });

        if (existingRestaurant) {
            return existingRestaurant;
        }

        // Create new restaurant
        return createRestaurantForUser(clerkUserId, email, firstName);
    } catch (error) {
        console.error(
            `❌ Error getting/creating restaurant for user ${clerkUserId}:`,
            error
        );
        throw error;
    }
}
