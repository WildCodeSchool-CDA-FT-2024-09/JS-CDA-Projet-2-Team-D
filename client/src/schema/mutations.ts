import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation AddCategory($label: String!, $creditDebitId: Float!) {
    addCategory(label: $label, creditDebitId: $creditDebitId) {
      id
      label
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
  mutation SoftDeleteUser($data: userIdInput!) {
    softDeleteUser(data: $data) {
      message
      success
    }
  }
`;
