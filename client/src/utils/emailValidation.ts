import * as z from "zod";

// Validation Schema
export const emailSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email requis" })
    .email({ message: "Adresse email invalide" }),
});
