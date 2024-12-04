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

export const GET_ROLES = gql`
  query GetRoles {
    getRoles {
      id
      label
    }
  }
`;
