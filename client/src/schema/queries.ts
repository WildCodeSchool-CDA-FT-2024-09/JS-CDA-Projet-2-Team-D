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
        deletedAt
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
  query GetInvoicesByCommissionId(
    $commissionId: Float!
    $offset: Float!
    $limit: Float!
  ) {
    getInvoicesByCommissionId(
      commissionId: $commissionId
      offset: $offset
      limit: $limit
    ) {
      invoices {
        date
        id
        invoiceNumber
        label
        price_without_vat
        status {
          label
          id
        }
        vat {
          rate
          label
          id
        }
        creditDebit {
          label
          id
        }
      }
      totalCount
      totalAmount
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($userId: Float!) {
    getUserById(userId: $userId) {
      id
      email
      firstname
      lastname
      roles {
        id
        label
      }
      commissions {
        id
        name
      }
    }
  }
`;

export const GET_CURRENT_BUDGET_BY_COMMISSION_ID = gql`
  query GetCurrentBudgetByCommissionID($commissionId: Int!) {
    getCurrentBudgetByCommissionID(commissionId: $commissionId) {
      amount
    }
  }
`;

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    getAuthenticatedUser {
      id
      firstname
      lastname
      email
      roles {
        id
      }
    }
  }
`;

export const GET_EXERCISES = gql`
  query GetExercises {
    getExercises {
      id
      label
      start_date
      end_date
      budgets {
        commissionId
        amount
        commissions {
          id
          name
        }
      }
    }
  }
`;

export const GET_BUDGET_OVERVIEW = gql`
  query GetBudgetOverview {
    getBudgetOverview {
      globalBudget
      budgets {
        amount
        commissions {
          name
        }
      }
    }
  }
`;

export const GET_INVOICES_TO_VALIDATE_OR_REFUSED = gql`
  query GetInvoicesToValidateOrRefused {
    getInvoicesToValidateOrRefused {
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

export const GET_BANKS = gql`
  query GetBanks {
    getBanks {
      label
      id
      bankAccounts {
        name
        account_number
        balance
        id
      }
    }
  }
`;

export const GET_INVOICE_BY_EXERCISE = gql`
  query GetInvoicesByExercise(
    $exerciseId: Float!
    $limit: Float!
    $offset: Float!
  ) {
    getInvoicesByExercise(
      exerciseId: $exerciseId
      limit: $limit
      offset: $offset
    ) {
      totalCount
      invoices {
        id
        invoiceNumber
        label
        date
        amount_with_vat
        status {
          label
        }
        commission {
          name
        }
        creditDebit {
          label
        }
        subcategory {
          label
        }
      }
    }
  }
`;
