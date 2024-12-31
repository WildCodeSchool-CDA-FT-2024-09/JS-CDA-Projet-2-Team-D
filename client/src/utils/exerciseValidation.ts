import * as z from "zod";

// Validation Schema
export const validateExerciseSchema = z
  .object({
    label: z
      .string()
      .min(1, { message: "Libellé requis" })
      .max(100, { message: "Libellé trop long (max 100 caractères)" })
      .regex(/^[0-9a-zA-ZÀ-ÿ\s-]+$/, {
        message: "Seuls les caractères alphanumériques sont autorisés",
      }),

    start_date: z.date({
      required_error: "La date de début est requise",
      invalid_type_error: "Format de date invalide",
    }),

    end_date: z.date({
      required_error: "La date de fin est requise",
      invalid_type_error: "Format de date invalide",
    }),
  })
  .refine((data) => data.end_date > data.start_date, {
    message: "La date de fin doit être après la date de début",
    path: ["end_date"],
  });
