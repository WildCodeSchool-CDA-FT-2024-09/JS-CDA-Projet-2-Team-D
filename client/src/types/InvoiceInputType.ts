export interface InvoiceState {
  // [key: string]: unknown;
  commission_id: number | null;
  date: Date | null;
  category_id: number | null;
  invoice_id?: string | null;
  subcategory_id: number | null;
  label: string;
  credit_debit_id: number;
  receipt: File | null;
  info: string;
  paid: boolean;
  price_without_vat: number;
  vat_id: number;
  status_id: number;
  user_id: number | null;
  total: number; // Total amount (TTC)
}

// ValidInvoice doit aussi avoir l'index signature
export interface ValidInvoice {
  // [key: string]: unknown; // Ajouter l'index signature ici aussi
  commission_id: number;
  date: Date;
  price_without_vat: number;
  category_id: number;
  invoice_id: string;
  subcategory_id: number;
  label: string;
  receipt: File;
  credit_debit_id: number;
  info: string;
  paid: boolean;
  vat_id: number;
  status_id: number;
  user_id: number;
  total: number;
}

export const initialValues: InvoiceState = {
  commission_id: null,
  date: new Date(),
  price_without_vat: 0,
  category_id: null,
  invoice_id: "",
  subcategory_id: null,
  label: "",
  receipt: null,
  credit_debit_id: 1,
  info: "",
  paid: false,
  vat_id: 1,
  status_id: 2,
  user_id: null,
  total: 0,
};

// export interface ValidInvoice {
//   commission_id: number;
//   date: Date;
//   price_without_vat: number;
//   category_id: number;
//   invoice_id: string;
//   subcategory_id: number;
//   label: string;
//   receipt: File;
//   credit_debit_id: number;
//   info: string;
//   paid: boolean;
//   vat_id: number;
//   status_id: number;
//   user_id: number;
//   total: number;
// }

export const isValidInvoice = (
  invoice: InvoiceState,
  userId: number | undefined | null,
): invoice is ValidInvoice => {
  return (
    invoice.commission_id !== null &&
    invoice.date !== null &&
    invoice.category_id !== null &&
    invoice.subcategory_id !== null &&
    invoice.receipt !== null &&
    userId !== null &&
    userId !== undefined &&
    invoice.label.trim() !== "" &&
    invoice.price_without_vat > 0
  );
};
