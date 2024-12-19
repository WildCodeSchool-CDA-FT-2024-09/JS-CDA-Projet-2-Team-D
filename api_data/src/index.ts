import * as dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source";
import getSchema from "./schema";

dotenv.config();
const { PORT } = process.env;

(async () => {
  await AppDataSource.initialize();

  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ res }) => {
      return { res };
    },
  });

  console.info(`🚀 Server ready at: ${url}`);
})();
