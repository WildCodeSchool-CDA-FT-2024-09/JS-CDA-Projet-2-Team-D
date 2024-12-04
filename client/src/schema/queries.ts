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

export const GET_INVOICE_BY_COMMISSION = gql`
  query GetInvoicesByCommissionId($commissionId: Float!) {
    getInvoicesByCommissionId(commissionId: $commissionId) {
      commission {
        name
        id
      }
      creditDebit {
        label
        id
      }
      date
      id
      label
      status {
        id
        label
      }
      vat {
        id
        rate
        label
      }
      price_without_vat
    }
  }
`;
