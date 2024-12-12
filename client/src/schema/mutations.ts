import { gql } from "@apollo/client";

export const ADD_CATEGORY = gql`
  mutation AddCategory($label: String!, $creditDebitId: Float!) {
    addCategory(label: $label, creditDebitId: $creditDebitId) {
      id
      label
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
