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

export type SupplementCategory = 
  | "VIANDE" 
  | "FROMAGE" 
  | "LEGUME" 
  | "OEUF" 
  | "AUTRE";

export type SupplementType = 
  // Viandes
  | "TENDERS"
  | "CORDON_BLEU"
  | "STEAK"
  | "STEAK_FARCI"
  | "ESCALOPE"
  | "CURRY"
  | "CUISSE_POULET_DESOSSEE"
  | "TANDOORI"
  | "KEBAB"
  | "KEFTA"
  | "POULET_FUME"
  | "BACON"
  | "JAMBON"
  // Fromages
  | "CHEDDAR"
  | "BOURSIN"
  | "CHEVRE"
  | "MOZZARELLA"
  | "RACLETTE"
  | "REBLOCHON"
  // Oeuf
  | "OEUF";

export interface SupplementOption {
  type: SupplementType;
  label: string;
  category: SupplementCategory;
  price: number; // Price in EUR (e.g., 1.50)
}

// Based on your menu image prices
export const SUPPLEMENT_OPTIONS: SupplementOption[] = [
  // Viandes - 1.50€
  { type: "TENDERS", label: "Tenders", category: "VIANDE", price: 1.50 },
  { type: "CORDON_BLEU", label: "Cordon Bleu", category: "VIANDE", price: 1.50 },
  { type: "STEAK", label: "Steak", category: "VIANDE", price: 1.50 },
  { type: "STEAK_FARCI", label: "Steak Farci", category: "VIANDE", price: 1.50 },
  { type: "ESCALOPE", label: "Escalope", category: "VIANDE", price: 1.50 },
  { type: "CURRY", label: "Curry", category: "VIANDE", price: 1.50 },
  { type: "CUISSE_POULET_DESOSSEE", label: "Cuisse de Poulet Désossée", category: "VIANDE", price: 1.50 },
  { type: "TANDOORI", label: "Tandoori", category: "VIANDE", price: 1.50 },
  { type: "KEBAB", label: "Kebab", category: "VIANDE", price: 1.50 },
  { type: "KEFTA", label: "Kefta", category: "VIANDE", price: 1.50 },
  
  // Viandes - 0.50€
  { type: "POULET_FUME", label: "Poulet Fumé", category: "VIANDE", price: 0.50 },
  { type: "BACON", label: "Bacon", category: "VIANDE", price: 0.50 },
  { type: "JAMBON", label: "Jambon", category: "VIANDE", price: 0.50 },
  
  // Fromages - 0.50€
  { type: "CHEDDAR", label: "Cheddar", category: "FROMAGE", price: 0.50 },
  { type: "BOURSIN", label: "Boursin", category: "FROMAGE", price: 0.50 },
  { type: "CHEVRE", label: "Chèvre", category: "FROMAGE", price: 0.50 },
  { type: "MOZZARELLA", label: "Mozzarella", category: "FROMAGE", price: 0.50 },
  { type: "RACLETTE", label: "Raclette", category: "FROMAGE", price: 0.50 },
  { type: "REBLOCHON", label: "Reblochon", category: "FROMAGE", price: 0.50 },
  
  // Oeuf - 1.00€
  { type: "OEUF", label: "Œuf", category: "OEUF", price: 1.00 },
];

export interface SelectedSupplement {
  supplementType: SupplementType;
  customName?: string;
  quantity: number;
  price: number; // Store price at time of order
}
