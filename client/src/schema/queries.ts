import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      firstname
      lastname
      email
    }
  }
`;

export const GET_INVOICES = gql`
  query GetInvoices {
    getInvoices {
      commission_id
      date
      category_id
      invoice_id
      subcategory_id
      label
      credit_debit_id
      receipt
      info
      paid
      price_without_vat
      vat_id
      status_id
      user_id
      total
    }
  }
`;
