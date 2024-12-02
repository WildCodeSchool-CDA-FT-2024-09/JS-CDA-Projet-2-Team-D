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

  it("get all banks", async () => {
    const result = (await graphql({
      schema: schema,
      source: print(GET_BANKS),
    })) as { data: { getBanks: Array<unknown> } };
    console.info(result);

    expect(result.data.getBanks).toEqual(expect.any(Array));
  });
});
