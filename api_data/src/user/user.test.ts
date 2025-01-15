import { GraphQLSchema, graphql, print } from "graphql";
import gql from "graphql-tag";
import getSchema from "../schema";

export const GET_PAGINATED_USERS = gql`
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
        deletedAt
      }
      totalCount
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

describe("User resolver", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  it("Should get the 10 first users", async () => {
    // Mock authenticated user context
    const context = {
      loggedInUser: {
        id: 21,
        email: "super@admin.com",
        firstname: "Super",
        lastname: "Admin",
        roles: [{ id: 1 }],
      },
    };
    const offset = 0;
    const limit = 10;

    const result = (await graphql({
      schema: schema,
      source: print(GET_PAGINATED_USERS),
      variableValues: { limit: limit, offset: offset },
      contextValue: context,
    })) as { data: { getUsers: Array<unknown> } };

    expect(result.data.getUsers).toEqual(expect.any(Object));
  });

  it("Should get the user with ID 7", async () => {
    const id = 7;
    // Mock authenticated user context
    const context = {
      loggedInUser: {
        id: 21,
        email: "super@admin.com",
        firstname: "Super",
        lastname: "Admin",
        roles: [{ id: 1 }],
      },
    };
    const expectedResult = {
      commissions: [
        { id: 1, name: "Équipement" },
        { id: 2, name: "Animation" },
        { id: 3, name: "Opérationnel" },
        { id: 4, name: "Jeunesse" },
        { id: 5, name: "Communication" },
        { id: 6, name: "Événementiel" },
        { id: 7, name: "Formation" },
      ],
      email: "julie.michel@association.com",
      firstname: "Julie",
      id: 7,
      lastname: "Michel",
      roles: [{ id: 3, label: "Responsable Commission" }],
    };

    const result = (await graphql({
      schema: schema,
      source: print(GET_USER_BY_ID),
      variableValues: { userId: id },
      contextValue: context,
    })) as {
      data: {
        getUserById: Array<{
          email: string;
          firstname: string;
          lastname: string;
        }>;
      };
    };

    expect(result.data.getUserById).toEqual(
      expect.objectContaining(expectedResult)
    );
  });
});
