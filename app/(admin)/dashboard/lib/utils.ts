// Generate the public menu URL for QR codes
export function generateMenuUrl(slug: string, baseUrl?: string): string {
  // Use the provided baseUrl or fallback to window location or env variable
  const base = baseUrl ||
    (typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL) ||
    "http://localhost:3000";

  return `${base}/menu/${slug}`;
}
