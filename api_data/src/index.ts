import * as dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source";
import * as jwt from "jsonwebtoken";
import getSchema from "./schema";

dotenv.config();
const { PORT, AUTH_SECRET_KEY } = process.env;

function parseCookies(cookieHeader: string | undefined) {
  if (!cookieHeader) return {};
  return cookieHeader
    .split(";")
    .reduce((cookies: Record<string, string>, cookie) => {
      const [key, value] = cookie.trim().split("=");
      cookies[key] = value;
      return cookies;
    }, {});
}

(async () => {
  await AppDataSource.initialize();

  const schema = await getSchema();

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
    context: async ({ req, res }) => {
      if (!req.headers.cookie) return { res };

      const cookies = parseCookies(req.headers.cookie as string);
      const clubcompta_token = cookies.clubcompta_token;

      if (!clubcompta_token) return { res };

      try {
        const payload = jwt.verify(clubcompta_token, AUTH_SECRET_KEY as string);
        return { res, loggedInUser: payload };
      } catch {
        return { res };
      }
    },
  });

  console.info(`🚀 Server ready at: ${url}`);
})();
