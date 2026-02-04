import { auth, clerkClient } from "@clerk/nextjs/server";
import { addCorsHeaders } from "@/lib/cors";
import { getOrCreateRestaurant } from "@/lib/services/restaurantService";

export async function GET(req: Request) {
  try {
    console.log("[Restaurant API] Received request");
    const { userId } = await auth();

    if (!userId) {
      console.log("[Restaurant API] No userId, returning 401");
      return new Response(
        JSON.stringify({ error: "Unauthorized - Please log in first" }),
        {
          status: 401,
          headers: addCorsHeaders(),
        },
      );
    }

    console.log("[Restaurant API] Fetching restaurant for userId:", userId);
    console.time("db-test");
    // Get user details from Clerk
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    console.timeEnd("db-test");
    const email = user.emailAddresses[0]?.emailAddress || "user@example.com";
    const firstName = user.firstName || undefined;

    console.log("[Restaurant API] Creating restaurant with:", {
      userId,
      email,
      firstName,
    });

    const restaurant = await getOrCreateRestaurant(userId, email, firstName);

    console.log("[Restaurant API] Restaurant fetched/created:", restaurant.id);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          restaurantId: restaurant.id,
          name: restaurant.name,
          slug: restaurant.slug,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...addCorsHeaders(),
        },
      },
    );
  } catch (error) {
    console.error("[Restaurant API] Error getting/creating restaurant:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to get or create restaurant",
        details: error instanceof Error ? error.message : String(error),
      }),
      {
        status: 500,
        headers: addCorsHeaders(),
      },
    );
  }
}
