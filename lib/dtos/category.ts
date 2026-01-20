import z from "zod";

export const categoryCreateSchema = z
  .object({
    restaurantId: z.string(),

    nameEn: z.string().min(1).max(200).optional(),
    nameFr: z.string().min(1).max(200).optional(),
    nameAr: z.string().min(1).max(200).optional(),

    icon: z.string().url().optional(),

    visible: z.boolean().default(true),
    order: z.number().int().min(0).optional(),
    isActive: z.boolean().default(true),
  })
  .refine((data) => data.nameEn || data.nameFr || data.nameAr, {
    message: "At least one name (EN, FR, AR) is required",
  });

export const categoryReorderSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string(),
      order: z.number().int().min(0),
    })
  ),
});

export const categoryUpdateSchema = z.object({
  nameEn: z.string().min(1).max(200).optional(),
  nameFr: z.string().min(1).max(200).optional(),
  nameAr: z.string().min(1).max(200).optional(),

  icon: z.string().url().optional(),

  visible: z.boolean().optional(),
  order: z.number().int().min(0).optional(),
  isActive: z.boolean().optional(),
});
