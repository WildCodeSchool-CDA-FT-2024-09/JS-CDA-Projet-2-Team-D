import * as dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import "reflect-metadata";
import { AppDataSource } from "./db/data-source";
import UserResolver from "./user/user.resolver";
import CreditDebitResolver from "./creditDebit/creditDebit.resolver";
import CategoryResolver from "./category/category.resolver";
import SubcategoryResolver from "./subcategory/subcategory.resolver";
import BankResolver from "./bank/bank.resolver";
import BankAccountResolver from "./bankAccount/bank_account.resolver";
import VatResolver from "./vat/vat.resolver";

dotenv.config();
const { PORT } = process.env;

(async () => {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      CreditDebitResolver,
      CategoryResolver,
      SubcategoryResolver,
      BankResolver,
      BankAccountResolver,
      VatResolver,
    ],
    validate: true,
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(PORT) },
  });

  console.info(`🚀 Server ready at: ${url}`);
})();
