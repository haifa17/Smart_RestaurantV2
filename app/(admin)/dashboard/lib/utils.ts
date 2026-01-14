export function generateMenuUrl(slug: string, baseUrl: string = "https://yourdomain.com"): string {
  return `${baseUrl}/${slug}`
}
