import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { OrderStatus, OrderType, SelectedSupplement, SUPPLEMENT_OPTIONS, SupplementCategory, SupplementOption, SupplementType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a URL-friendly slug from a string
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .replace(/^-|-$/g, ""); // Remove leading/trailing hyphens
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
  DELIVERY: { label: "Livraison", icon: " " },
};
// Helper function to get supplement label
export const getSupplementLabel = (supplement: SelectedSupplement): string => {
  if (supplement.customName) return supplement.customName;
  const option = SUPPLEMENT_OPTIONS.find((opt) => opt.type === supplement.supplementType);
  return option?.label || supplement.supplementType;
};

// Helper to get supplement price
export const getSupplementPrice = (supplementType: SupplementType): number => {
  const option = SUPPLEMENT_OPTIONS.find((opt) => opt.type === supplementType);
  return option?.price || 0;
};

// Group supplements by category for UI
export const getSupplementsByCategory = () => {
  return SUPPLEMENT_OPTIONS.reduce((acc, supplement) => {
    if (!acc[supplement.category]) {
      acc[supplement.category] = [];
    }
    acc[supplement.category].push(supplement);
    return acc;
  }, {} as Record<SupplementCategory, SupplementOption[]>);
};