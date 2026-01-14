import z from "zod";

export const imageUploadSchema = z.object({
  folder: z.enum(['logos', 'heroes', 'menu-items', 'story-cards']),
})