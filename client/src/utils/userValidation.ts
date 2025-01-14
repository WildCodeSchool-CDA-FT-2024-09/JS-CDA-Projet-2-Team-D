import * as z from "zod";

// Validation Schema
export const updateUserSchema = z.object({
  firstname: z
    .string()
    .min(1, { message: "Prénom requis" })
    .max(50, { message: "Prénom trop long (max 50 caractères)" })
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, { message: "Prénom invalide" }),

  lastname: z
    .string()
    .min(1, { message: "Nom requis" })
    .max(50, { message: "Nom trop long (max 50 caractères)" })
    .regex(/^[a-zA-ZÀ-ÿ\s-]+$/, { message: "Nom invalide" }),

  email: z
    .string()
    .min(1, { message: "Email requis" })
    .email({ message: "Adresse email invalide" }),

  roles: z.array(z.string()).optional(),

  commissions: z.array(z.string()).optional(),
});
