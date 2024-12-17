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
  user_id: number | null;
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
  user_id: null,
  total: 0,
};
