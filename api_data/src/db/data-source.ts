import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Role } from "../role/role.entity";
import { User } from "../user/user.entity";
import { Bank } from "../bank/bank.entity";
import { BankAccount } from "../bankAccount/bank_account.entity";

dotenv.config();
const { POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_USER, POSTGRES_HOST } =
  process.env;

export const AppDataSource = new DataSource({
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [Role, User, Bank, BankAccount],
  synchronize: true, // /!\ only in dev
});
