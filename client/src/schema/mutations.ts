import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation AddCategory($label: String!, $creditDebitId: Float!) {
    addCategory(label: $label, creditDebitId: $creditDebitId) {
      creditDebit {
        id
      }
      label
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation UpdateCategory(
    $id: Float!
    $label: String!
    $creditDebitId: Float!
  ) {
    updateCategory(id: $id, label: $label, creditDebitId: $creditDebitId) {
      id
      label
      creditDebit {
        id
      }
    }
  }
`;

export const UPDATE_SUBCATEGORY = gql`
  mutation UpdateSubcategory(
    $id: Float!
    $label: String!
    $code: String!
    $categoryId: Float!
  ) {
    updateSubcategory(
      id: $id
      label: $label
      code: $code
      categoryId: $categoryId
    ) {
      id
      label
      code
    }
  }
`;

export const ADD_SUBCATEGORY = gql`
  mutation AddSubcategory(
    $label: String!
    $code: String!
    $categoryId: Float!
  ) {
    addSubcategory(label: $label, code: $code, categoryId: $categoryId) {
      id
      label
      code
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation CreateNewUser($data: UserInput!) {
    createNewUser(data: $data) {
      id
      firstname
      lastname
      email
      password
      roles {
        id
      }
      commissions {
        id
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($data: UserInput!, $userId: Float!) {
    updateUser(data: $data, userId: $userId) {
      id
      firstname
      lastname
      email
      password
      roles {
        id
      }
      commissions {
        id
      }
    }
  }
`;

export const SOFTDELETE_USER = gql`
  mutation SoftDeleteUser($data: UserIdInput!) {
    softDeleteUser(data: $data) {
      message
      success
    }
  }
`;

export const RESTORE_USER = gql`
  mutation RestoreUser($data: UserIdInput!) {
    restoreUser(data: $data) {
      message
      success
    }
  }
`;

export const LOGIN = gql`
  mutation Login($password: String!, $email: String!) {
    login(password: $password, email: $email) {
      id
      firstname
      lastname
      email
      roles {
        id
      }
      token
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export const CREATE_EXERCISE = gql`
  mutation CreateNewExercise($data: ExerciseInput!) {
    createNewExercise(data: $data) {
      id
      label
      start_date
      end_date
    }
  }
`;

export const SET_COMMISSION_BUDGET_AMOUNT = gql`
  mutation SetCommissionBudgetAmount(
    $exerciseId: Float!
    $commissionId: Float!
    $amount: Float!
  ) {
    setCommissionBudgetAmount(
      exerciseId: $exerciseId
      commissionId: $commissionId
      amount: $amount
    ) {
      commissionId
      exerciseId
      amount
    }
  }
`;

export const UPDATE_STATUS_INVOICE = gql`
  mutation UpdateStatusInvoice($invoiceId: Float!, $statusId: Float!) {
    updateInvoiceStatus(invoiceId: $invoiceId, statusId: $statusId) {
      id
      status {
        id
      }
    }
  }
`;

export const REQUEST_RESET_PASSWORD = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($newPassword: String!, $token: String!) {
    resetPassword(newPassword: $newPassword, token: $token)
  }
`;
