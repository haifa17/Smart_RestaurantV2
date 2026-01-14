// API Response types
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: { message: string; code: string; details?: unknown } }