export type Invoice = {
  id: number;
  bank_act_id: number;
  invoice_id: number;
  commission_id: number;
  price_without_vat: number;
  subcategory_id: number;
  label: string;
  receipt: string;
  credit_debit_id: number;
  info: string;
  paid: boolean;
  vat_id: number;
  status_id: number;
  user_id: number;
  date: Date;
};
