import z from "zod";

export const menuItemCreateSchema = z
  .object({
    restaurantId: z.string(),
    categoryId: z.string(),

    nameEn: z.string().min(1).max(200).optional(),
    nameFr: z.string().min(1).max(200).optional(),
    nameAr: z.string().min(1).max(200).optional(),

    descriptionEn: z.string().max(500).optional(),
    descriptionFr: z.string().max(500).optional(),
    descriptionAr: z.string().max(500).optional(),

    price: z.number().positive().max(999999.99),

    image: z.string().url().nullable().optional(),

    available: z.boolean().default(true),
    isActive: z.boolean().default(true),

    isChefRecommendation: z.boolean().default(false),
    isPopular: z.boolean().default(false),
    isSpicy: z.boolean().default(false),
    isVegetarian: z.boolean().default(false),
  })
  .refine((data) => data.nameEn || data.nameFr || data.nameAr, {
    message: "At least one name (EN, FR, AR) is required",
  });

export const menuItemUpdateSchema = z.object({
  categoryId: z.string().optional(),

  nameEn: z.string().min(1).max(200).optional(),
  nameFr: z.string().min(1).max(200).optional(),
  nameAr: z.string().min(1).max(200).optional(),

  descriptionEn: z.string().max(500).optional(),
  descriptionFr: z.string().max(500).optional(),
  descriptionAr: z.string().max(500).optional(),

  price: z.number().positive().max(999999.99).optional(),

  image: z.string().url().nullable().optional(),

  available: z.boolean().optional(),
  isActive: z.boolean().optional(),

  isChefRecommendation: z.boolean().optional(),
  isPopular: z.boolean().optional(),
  isSpicy: z.boolean().optional(),
  isVegetarian: z.boolean().optional(),
});
