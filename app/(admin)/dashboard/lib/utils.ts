// Generate the public menu URL for QR codes
export function generateMenuUrl(menuBaseUrl: string, slug: string): string {
  return `${menuBaseUrl.replace(/\/$/, "")}/${slug}`;
}
