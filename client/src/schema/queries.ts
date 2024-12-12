import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($limit: Int!, $offset: Int!) {
    getUsers(limit: $limit, offset: $offset) {
      users {
        id
        firstname
        lastname
        email
        password
        roles {
          id
          label
        }
        commissions {
          id
          name
        }
      }
      totalCount
    }
  }
`;

export const GET_ROLES = gql`
  query GetRoles {
    getRoles {
      id
      label
    }
  }
`;

export const GET_INVOICES = gql`
  query GetInvoices {
    getInvoices {
      id
      price_without_vat
      label
      receipt
      info
      paid
      date
      invoiceNumber
      status {
        id
        label
      }
      vat {
        id
        rate
      }
      creditDebit {
        id
        label
      }
      subcategory {
        id
        label
      }
      commission {
        id
        name
      }
      bankAccount {
        id
        name
      }
      user {
        id
        firstname
        lastname
      }
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      id
      label
      subcategories {
        id
        label
        code
      }
      creditDebit {
        id
        label
      }
    }
  }
`;

export const GET_VAT_RATES = gql`
  query GetVats {
    getVats {
      id
      label
      rate
      invoices {
        id
        label
      }
    }
  }
`;

export const GET_COMMISSIONS = gql`
  query GetCommissions {
    getCommissions {
      id
      name
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
