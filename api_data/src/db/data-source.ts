import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Role } from "../role/role.entity";
import { User } from "../user/user.entity";
import { Bank } from "../bank/bank.entity";
import { BankAccount } from "../bankAccount/bank_account.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Vat } from "../vat/vat.entity";
import { Category } from "../category/category.entity";
import { Subcategory } from "../subcategory/subcategory.entity";
import { Exercise } from "../exercise/exercise.entity";
import { Status } from "../status/status.entity";
import { Invoice } from "../invoice/invoice.entity";
import { Commission } from "../commission/commission.entity";
import { Budget } from "../budget/budget.entity";

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
  entities: [
    Role,
    User,
    Bank,
    BankAccount,
    Category,
    Subcategory,
    CreditDebit,
    Exercise,
    Vat,
    Status,
    Invoice,
    Commission,
    Budget,
  ],
  synchronize: true, // /!\ only in dev
});
