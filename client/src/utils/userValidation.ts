import * as z from "zod";

// Validation Schema
export const updateUserSchema = z
  .object({
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

    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .regex(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])/, {
        message:
          "Le mot de passe doit contenir au moins 1 majuscule, 1 chiffre et 1 caractère spécial",
      })
      .optional(),

    passwordConfirm: z.string().optional(),

    roles: z.array(z.string()).optional(),

    commissions: z.array(z.string()).optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
  });
