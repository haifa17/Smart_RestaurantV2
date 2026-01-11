import z from "zod"

export const storyCardCreateSchema = z.object({
  restaurantId: z.string().cuid(),
  titleAr: z.string().min(1, 'Arabic title is required').max(100),
  titleFr: z.string().min(1, 'French title is required').max(100),
  subtitleAr: z.string().min(1, 'Arabic subtitle is required').max(200),
  subtitleFr: z.string().min(1, 'French subtitle is required').max(200),
  image: z.string().url().optional().nullable(),
  visible: z.boolean().default(true),
  order: z.number().int().min(0).optional(),
})

export const storyCardUpdateSchema = z.object({
  titleAr: z.string().min(1).max(100).optional(),
  titleFr: z.string().min(1).max(100).optional(),
  subtitleAr: z.string().min(1).max(200).optional(),
  subtitleFr: z.string().min(1).max(200).optional(),
  image: z.string().url().optional().nullable(),
  visible: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
})