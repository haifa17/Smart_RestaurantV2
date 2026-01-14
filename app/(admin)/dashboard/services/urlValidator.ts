/**
 * Validate and sanitize restaurant slug
 */
export function validateSlug(slug: string): boolean {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  return slugPattern.test(slug)
}

/**
 * Generate menu URL with validation
 */
export function generateMenuUrl(slug: string, baseUrl?: string): string {
  if (!validateSlug(slug)) {
    throw new Error('Invalid restaurant slug')
  }

  const domain = baseUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://yourdomain.com'
  return `${domain}/${slug}`
}