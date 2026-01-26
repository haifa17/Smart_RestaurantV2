// lib/models/order.ts

export type OrderStatus = 
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "COMPLETED"
  | "CANCELLED";

export type OrderType = "DINE_IN" | "TAKEAWAY";

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  type: OrderType;
  status: OrderStatus;
  tableNumber?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  isPaid: boolean;
  paidAt?: string;
  notes?: string;
  adminNotes?: string;
  confirmedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  customer?: Customer;
  statusHistory?: OrderStatusHistory[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId?: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  phone: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderStatusHistory {
  id: string;
  orderId: string;
  status: OrderStatus;
  notes?: string;
  changedBy?: string;
  createdAt: string;
}

export interface CreateOrderData {
  customerName?: string;
  customerPhone?: string;
  type: OrderType;
  tableNumber?: string;
  notes?: string;
  items: {
    menuItemId: string;
    name: string;
    price: number;
    quantity: number;
    notes?: string;
  }[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

export interface UpdateOrderData {
  status?: OrderStatus;
  tableNumber?: string;
  notes?: string;
  adminNotes?: string;
  isPaid?: boolean;
}

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: string; bgColor: string }
> = {
  PENDING: {
    label: "En attente",
    color: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  CONFIRMED: {
    label: "Confirmé",
    color: "text-blue-700",
    bgColor: "bg-blue-100",
  },
  PREPARING: {
    label: "En préparation",
    color: "text-purple-700",
    bgColor: "bg-purple-100",
  },
  READY: {
    label: "Prêt",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  COMPLETED: {
    label: "Terminé",
    color: "text-gray-700",
    bgColor: "bg-gray-100",
  },
  CANCELLED: {
    label: "Annulé",
    color: "text-red-700",
    bgColor: "bg-red-100",
  },
};

export const ORDER_TYPE_CONFIG: Record<
  OrderType,
  { label: string; icon: string }
> = {
  DINE_IN: { label: "Sur place", icon: "🍽️" },
  TAKEAWAY: { label: "À emporter", icon: "📦" },
};