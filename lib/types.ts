// API Response types
export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: { message: string; code: string; details?: unknown } }

  export type OrderStatus = 
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type OrderType = "DINE_IN" | "TAKEAWAY" | "DELIVERY";
