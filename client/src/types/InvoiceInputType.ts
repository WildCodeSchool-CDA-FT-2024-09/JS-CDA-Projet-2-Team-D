// import * as Yup from "yup";

// export const invoiceValidationSchema = Yup.object({
//   commission_id: Yup.number()
//     .required("La commission est requise")
//     .min(1, "Sélectionnez une commission"),
//   date: Yup.date().required("La date est requise"),
//   category_id: Yup.number()
//     .required("La catégorie est requise")
//     .min(1, "Sélectionnez une catégorie"),
//   subcategory_id: Yup.number()
//     .required("La sous-catégorie est requise")
//     .min(1, "Sélectionnez une sous-catégorie"),
//   label: Yup.string()
//     .required("Le libellé est requis")
//     .max(50, "Le libellé ne doit pas dépasser 50 caractères")
//     .matches(
//       /^[A-Za-z0-9À-ÖØ-öø-ÿ@_\-\s]+$/,
//       "Le libellé ne peut contenir que des lettres, chiffres, espaces et certains caractères spéciaux",
//     ),
//   price_without_vat: Yup.number()
//     .required("Le prix HT est requis")
//     .min(0, "Le prix doit être positif ou nul"),
//   vat_id: Yup.number().required("Le taux de TVA est requis"),
//   receipt: Yup.mixed().required("Le justificatif est requis"),
//   info: Yup.string().max(
//     250,
//     "Les informations ne doivent pas dépasser 250 caractères",
//   ),
// });

export interface InvoiceState {
  commission_id: number;
  date: Date | null;
  category_id: number;
  invoice_id: string;
  subcategory_id: number;
  label: string;
  credit_debit_id: number;
  receipt: File | null;
  info: string;
  paid: boolean;
  price_without_vat: number;
  vat_id: number;
  status_id: number;
  user_id: number;
  total: number; // Total amount (TTC)
}

export const initialValues: InvoiceState = {
  commission_id: 0,
  date: new Date(),
  price_without_vat: 0,
  category_id: 0,
  invoice_id: "",
  subcategory_id: 0,
  label: "",
  receipt: null,
  credit_debit_id: 1,
  info: "",
  paid: false,
  vat_id: 1,
  status_id: 2,
  user_id: 0,
  total: 0,
};
