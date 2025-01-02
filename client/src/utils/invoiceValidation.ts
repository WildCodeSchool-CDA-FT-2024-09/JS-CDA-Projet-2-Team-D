import * as z from "zod";
import { InvoiceState } from "../types/InvoiceInputType";

export const createInvoiceSchema = z.object({
  price_without_vat: z
    .number()
    .min(0.01, { message: "Le prix hors TVA doit être supérieur à 0" }),
  label: z
    .string()
    .min(1, { message: "Le label est requis" })
    .max(50, { message: "Le label ne peut pas dépasser 50 caractères" })
    .regex(/^[\w\s\-'.,:;!?()]{1,50}$/, {
      message:
        "Le label ne peut contenir que des lettres, chiffres et ponctuations basiques",
    }),
  receipt: z
    .instanceof(File, { message: "Le reçu doit être un fichier" })
    .refine((file) => file.size <= 10_000_000, {
      message: "Le fichier ne doit pas dépasser 10 Mo",
    })
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "application/pdf"].includes(file.type),
      { message: "Seuls les formats PNG, JPEG et PDF sont autorisés." },
    ),
  info: z
    .string()
    .max(250, {
      message: "Les informations ne peuvent pas dépasser 250 caractères",
    })
    .regex(/^[\w\s\-'.,:;!?()\n]{1,250}$/, {
      message:
        "Les informations ne peuvent contenir que des lettres, chiffres et ponctuations basiques",
    })
    .optional(),
  invoice_id: z.string().nullable().optional(),
  paid: z.boolean(),
  status_id: z.number().positive({ message: "Un statut valide est requis" }),
  vat_id: z.number().positive({ message: "Une TVA valide est requise" }),
  date: z.date().default(new Date()),
  category_id: z
    .number()
    .nullable()
    .refine((val) => val !== null && val !== 0, {
      message: "Une catégorie valide est requise",
    }),
  credit_debit_id: z.number().positive({
    message: "Une catégorie crédit/débit valide est requise",
  }),
  subcategory_id: z
    .number()
    .nullable()
    .refine((val) => val !== null && val !== 0, {
      message: "Une sous-catégorie valide est requise",
    }),
  commission_id: z
    .number()
    .nullable()
    .refine((val) => val !== null && val !== 0, {
      message: "Une commission valide est requise",
    }),
  user_id: z.number().positive({ message: "Un utilisateur valide est requis" }),
  total: z.number().min(0),
});

export type ValidatedInvoice = z.infer<typeof createInvoiceSchema>;

// Fonction de validation avec retour sécurisé
export const validateInvoice = (
  invoice: InvoiceState,
  userId: number | undefined | null,
): z.SafeParseReturnType<ValidatedInvoice, Record<string, unknown>> => {
  return createInvoiceSchema.safeParse({
    ...invoice,
    user_id: userId,
  });
};
