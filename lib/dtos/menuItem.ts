import z from "zod";

export const menuItemCreateSchema = z.object({
  restaurantId: z.string(),
  categoryId: z.string(),
  name: z.string().min(1, " name is required").max(200),
  description: z.string().max(500).default(""),
  price: z.number().positive("Price must be positive").max(999999.99),
  image: z.string().url().optional().nullable(),
  available: z.boolean().default(true),
});

export const menuItemUpdateSchema = z.object({
  categoryId: z.string().optional(),
  name: z.string().min(1).max(200).optional(),
  description: z.string().max(500).optional(),
  price: z.number().positive().max(999999.99).optional(),
  image: z.string().url().optional().nullable(),
  available: z.boolean().optional(),
});
