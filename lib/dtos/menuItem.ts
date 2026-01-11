import z from "zod"

export const menuItemCreateSchema = z.object({
  restaurantId: z.string().cuid(),
  categoryId: z.string().cuid(),
  nameAr: z.string().min(1, 'Arabic name is required').max(200),
  nameFr: z.string().min(1, 'French name is required').max(200),
  descriptionAr: z.string().max(500).default(''),
  descriptionFr: z.string().max(500).default(''),
  price: z.number().positive('Price must be positive').max(999999.99),
  image: z.string().url().optional().nullable(),
  available: z.boolean().default(true),
})

export const menuItemUpdateSchema = z.object({
  categoryId: z.string().cuid().optional(),
  nameAr: z.string().min(1).max(200).optional(),
  nameFr: z.string().min(1).max(200).optional(),
  descriptionAr: z.string().max(500).optional(),
  descriptionFr: z.string().max(500).optional(),
  price: z.number().positive().max(999999.99).optional(),
  image: z.string().url().optional().nullable(),
  available: z.boolean().optional(),
})
