import * as z from "zod";

// Validation Schema
export const resetPasswordSchema = z
  .object({
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
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Les mots de passe ne correspondent pas",
    path: ["passwordConfirm"],
  });
