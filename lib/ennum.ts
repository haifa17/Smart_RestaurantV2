export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export const DAYS_OF_WEEK: { value: DayOfWeek; label: string }[] = [
  { value: 'MONDAY', label: 'Lundi' },
  { value: 'TUESDAY', label: 'Mardi' },
  { value: 'WEDNESDAY', label: 'Mercredi' },
  { value: 'THURSDAY', label: 'Jeudi' },
  { value: 'FRIDAY', label: 'Vendredi' },
  { value: 'SATURDAY', label: 'Samedi' },
  { value: 'SUNDAY', label: 'Dimanche' },
];

export enum SauceType {
  MUSTARD = 'MUSTARD',
  SOY_SAUCE = 'SOY_SAUCE',
  MAYONNAISE = 'MAYONNAISE',
  BARBECUE = 'BARBECUE',
  KETCHUP = 'KETCHUP',
  HOT_SAUCE = 'HOT_SAUCE',
  RANCH = 'RANCH',
  HONEY_MUSTARD = 'HONEY_MUSTARD',
  SWEET_CHILI = 'SWEET_CHILI',
  GARLIC_AIOLI = 'GARLIC_AIOLI',
  OTHER = 'OTHER',
}

export enum CheeseType {
  CHEDDAR = 'CHEDDAR',
  MOZZARELLA = 'MOZZARELLA',
  PARMESAN = 'PARMESAN',
  BLUE_CHEESE = 'BLUE_CHEESE',
  GOAT_CHEESE = 'GOAT_CHEESE',
  SWISS = 'SWISS',
  FETA = 'FETA',
  CREAM_CHEESE = 'CREAM_CHEESE',
  PROVOLONE = 'PROVOLONE',
  OTHER = 'OTHER',
}
