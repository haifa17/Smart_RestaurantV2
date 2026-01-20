export function addCorsHeaders(headers?: Record<string, string>) {
  return {
    "Access-Control-Allow-Origin": "*", // replace "*" with your menu domain in production
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    ...headers,
  }
}

// Handle OPTIONS preflight requests
export function handleOptions() {
  return new Response(null, {
    status: 204,
    headers: addCorsHeaders(),
  })
}