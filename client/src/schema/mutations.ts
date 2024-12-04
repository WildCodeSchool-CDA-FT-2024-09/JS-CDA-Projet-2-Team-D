import { gql } from "@apollo/client";

export const CREATE_INVOICE = gql`
  mutation CreateInvoice($input: InvoiceInput!) {
    createInvoice(input: $input) {
      id
      commission_id
      date
      category_id
      subcategory_id
      invoice_id
      label
      credit_debit_id
      price_without_vat
      vat_id
      total
      receipt
      paid
      info
      status_id
      user_id
    }
  }
`;

export const GET_VAT_RATES = gql`
  query GetVATRates {
    vatRates {
      id
      label
      rate
    }
  }
`;
