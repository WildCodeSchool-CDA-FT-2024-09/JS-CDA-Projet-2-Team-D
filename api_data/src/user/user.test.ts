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

  it("get the 10 first users", async () => {
    const offset = 0;
    const limit = 10;

    const result = (await graphql({
      schema: schema,
      source: print(GET_PAGINATED_USERS),
      variableValues: { limit: limit, offset: offset },
    })) as { data: { getUsers: Array<unknown> } };

    expect(result.data.getUsers).toEqual(expect.any(Array));
  });

  it("get the user with ID 7", async () => {
    const id = 7;
    const expectedResult = {
      email: "julie.michel@association.com",
      firstname: "Julie",
      lastname: "Michel",
    };

    const result = (await graphql({
      schema: schema,
      source: print(GET_USER_BY_ID),
      variableValues: { userId: id },
    })) as {
      data: {
        getUserById: Array<{
          email: string;
          firstname: string;
          lastname: string;
        }>;
      };
    };

    expect(result.data.getUserById).toContain(
      expect.objectContaining(expectedResult)
    );
  });
});
