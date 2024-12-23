import * as z from "zod";

// Validation Schema pour Invoice
export const createInvoiceSchema = z.object({
  price_without_vat: z
    .number()
    .min(0.01, { message: "Le prix hors TVA doit être supérieur à 0" }),

  label: z
    .string()
    .min(1, { message: "Le label est requis" })
    .max(50, { message: "Le label ne peut pas dépasser 50 caractères" }),

  receipt: z
    .string()
    .min(1, { message: "Le reçu est requis" })
    .max(30, {
      message: "Le nom du fichier reçu ne peut pas dépasser 30 caractères",
    })
    .refine((value) => value !== "", {
      message: "Le reçu ne peut pas être une chaîne vide",
    }),

  info: z
    .string()
    .max(250, {
      message:
        "Les informations supplémentaires ne peuvent pas dépasser 250 caractères",
    })
    .nullable()
    .optional(),

  paid: z.boolean({
    required_error: "Le statut de paiement est requis",
    invalid_type_error: "La valeur doit être un booléen",
  }),

  status: z.object({
    id: z.number().positive({ message: "Un statut valide est requis" }),
  }),

  vat: z.object({
    id: z.number().positive({ message: "Une TVA valide est requise" }),
    rate: z
      .number()
      .min(0, { message: "Le taux de TVA ne peut pas être inférieur à 0" })
      .max(100, { message: "Le taux de TVA ne peut pas être supérieur à 100" })
      .default(0),
  }),

  date: z.date().optional().default(new Date()),

  category: z.object({
    id: z.number().positive({ message: "Une catégorie valide est requise" }),
  }),

  creditDebit: z.object({
    id: z
      .number()
      .positive({ message: "Une catégorie crédit/débit valide est requise" }),
  }),

  subcategory: z.object({
    id: z
      .number()
      .positive({ message: "Une sous-catégorie valide est requise" }),
  }),

  commission: z.object({
    id: z.number().positive({ message: "Une commission valide est requise" }),
  }),

  bankAccount: z
    .object({
      id: z
        .number()
        .positive({ message: "Un compte bancaire valide est requis" }),
    })
    .nullable()
    .optional(),

  invoiceNumber: z
    .string()
    .max(50, {
      message: "Le numéro de facture ne peut pas dépasser 50 caractères",
    })
    .nullable()
    .optional(),

  user: z.object({
    id: z.number().positive({ message: "Un utilisateur valide est requis" }),
  }),
});
