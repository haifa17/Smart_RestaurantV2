import { z } from "zod";

export const scheduleSchema = z.object({
  id: z.string().optional(), // Optional because temp IDs will be ignored
  dayOfWeek: z.enum([
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ]),
  opensAt: z.string().regex(/^\d{2}:\d{2}$/), // HH:mm format
  closesAt: z.string().regex(/^\d{2}:\d{2}$/),
  isClosed: z.boolean(),
  created_at: z.string().optional(), // Ignore these
  updated_at: z.string().optional(),
});
export const restaurantUpdateSchema = z.object({
  name: z.string().min(1).max(200).optional(),
  phone: z.string().nullable().optional(),
  logo: z.string().url().optional().nullable(),
  heroImage: z.string().url().optional().nullable(),
  tagline: z.string().max(500).optional(),
  story: z.string().max(2000).optional().nullable(),
  menuBaseUrl: z
    .string()
    .trim()
    .optional()
    .transform((val) => (val === "" ? null : val))
    .nullable()
    .refine(
      (val) => val === null || val === undefined || /^https?:\/\//.test(val),
      {
        message: "Menu URL must start with http or https",
      },
    ),
  schedules: z.array(scheduleSchema).optional(),
});
