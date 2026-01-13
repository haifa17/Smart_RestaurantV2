import z from "zod";

export const categoryCreateSchema = z.object({
  restaurantId: z.string().cuid(),
  name: z.string().min(1, "name is required").max(200),
  visible: z.boolean().default(true),
  order: z.number().int().min(0).optional(),
});
export const categoryReorderSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string().cuid(),
      order: z.number().int().min(0),
    })
  ),
});
export const categoryUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  visible: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
});
