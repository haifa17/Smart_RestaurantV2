// lib/models/order.ts

import { OrderStatus, OrderType } from "../types";
import { OrderItem } from "./OrderItem";

export interface Order {
  id: string;
  orderNumber: string;
  restaurantId: string;
  customerId?: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
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
    selectedSauces?: Array<{
      sauceType: string;
      customName?: string;
    }>;
    selectedCheeses?: Array<{
      cheeseType: string;
      customName?: string;
    }>;
    selectedSupplements?: Array<{
      supplementType: string;
      customName?: string;
      quantity: number;
      price: number;
    }>;
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
