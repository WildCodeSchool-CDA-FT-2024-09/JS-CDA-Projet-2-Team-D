export interface InvoiceState {
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
  amount_with_vat: number; // Total amount (TTC)
}

// ValidInvoice doit aussi avoir l'index signature
export interface ValidInvoice {
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
  amount_with_vat: number;
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
  vat_id: 3,
  status_id: 2,
  user_id: null,
  amount_with_vat: 0,
};

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
