// Generate the public menu URL for QR codes
export function generateMenuUrl(slug: string, baseUrl?: string): string {
  // Use the menu URL environment variable or fallback to localhost:3001
  const menuBaseUrl = baseUrl ||
    process.env.NEXT_PUBLIC_MENU_URL ||
    "http://localhost:3001";

  return `${menuBaseUrl}/${slug}`;
}
