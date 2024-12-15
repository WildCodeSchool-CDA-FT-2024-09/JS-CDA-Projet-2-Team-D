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
  mutation CreateNewUser($data: CreateUserInput!) {
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
