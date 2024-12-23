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
