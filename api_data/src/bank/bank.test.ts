import { GraphQLSchema, graphql, print } from "graphql";
import gql from "graphql-tag";
import getSchema from "../schema";

const GET_BANKS = gql`
  query GetBanks {
    getBanks {
      label
      id
    }
  }
`;

describe("Bank resolvers", () => {
  let schema: GraphQLSchema;

  beforeAll(async () => {
    schema = await getSchema();
  });

  it("Should successfully get banks with auth context", async () => {
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

    const result = await graphql({
      schema,
      source: print(GET_BANKS),
      contextValue: context,
    });

    expect(result.errors).toBeUndefined();
    expect(result.data?.getBanks).toEqual(expect.any(Array));
  });
});
