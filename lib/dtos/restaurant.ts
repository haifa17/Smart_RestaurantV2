import { z } from "zod";

export const restaurantUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  phone: z.string().nullable().optional(),
  logo: z.string().url().optional().nullable(),
  heroImage: z.string().url().optional().nullable(),
  tagline: z.string().max(500).optional(),
  story: z.string().max(2000).optional().nullable(),
});
