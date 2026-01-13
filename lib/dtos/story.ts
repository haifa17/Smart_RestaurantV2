import z from "zod";

export const storyCardCreateSchema = z.object({
  restaurantId: z.string().cuid(),
  title: z.string().min(1, " title is required").max(100),
  subtitle: z.string().min(1, " subtitle is required").max(200),
  image: z.string().url().optional().nullable(),
  visible: z.boolean().default(true),
  order: z.number().int().min(0).optional(),
});

export const storyCardUpdateSchema = z.object({
  title: z.string().min(1, " title is required").max(100),
  subtitle: z.string().min(1, " subtitle is required").max(200),
  image: z.string().url().optional().nullable(),
  visible: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});
