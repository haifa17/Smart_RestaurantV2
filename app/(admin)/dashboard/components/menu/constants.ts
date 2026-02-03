import { CheeseType, SauceType } from "@/lib/ennum";

export const SAUCE_OPTIONS = [
  { type: SauceType.MUSTARD, label: "Moutarde" },
  { type: SauceType.SOY_SAUCE, label: "Sauce Soja" },
  { type: SauceType.MAYONNAISE, label: "Mayonnaise" },
  { type: SauceType.BARBECUE, label: "Barbecue" },
  { type: SauceType.KETCHUP, label: "Ketchup" },
  { type: SauceType.HOT_SAUCE, label: "Sauce Piquante" },
  { type: SauceType.RANCH, label: "Ranch" },
  { type: SauceType.HONEY_MUSTARD, label: "Moutarde au Miel" },
  { type: SauceType.SWEET_CHILI, label: "Sweet Chili" },
  { type: SauceType.GARLIC_AIOLI, label: "Aïoli à l'Ail" },
];

// Cheese options with labels
export const CHEESE_OPTIONS = [
  { type: CheeseType.CHEDDAR, label: "Cheddar" },
  { type: CheeseType.MOZZARELLA, label: "Mozzarella" },
  { type: CheeseType.PARMESAN, label: "Parmesan" },
  { type: CheeseType.BLUE_CHEESE, label: "Bleu" },
  { type: CheeseType.GOAT_CHEESE, label: "Chèvre" },
  { type: CheeseType.SWISS, label: "Suisse" },
  { type: CheeseType.FETA, label: "Feta" },
  { type: CheeseType.CREAM_CHEESE, label: "Fromage à la Crème" },
  { type: CheeseType.PROVOLONE, label: "Provolone" },
];