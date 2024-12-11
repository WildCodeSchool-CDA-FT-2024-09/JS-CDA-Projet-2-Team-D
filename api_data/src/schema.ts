import { buildSchema } from "type-graphql";
import BankResolver from "./bank/bank.resolver";
import UserResolver from "./user/user.resolver";
import CreditDebitResolver from "./creditDebit/creditDebit.resolver";
import CategoryResolver from "./category/category.resolver";
import SubcategoryResolver from "./subcategory/subcategory.resolver";
import BankAccountResolver from "./bankAccount/bank_account.resolver";
import VatResolver from "./vat/vat.resolver";
import StatusResolver from "./status/status.resolver";
import CommissionResolver from "./commission/commission.resolver";
import InvoiceResolver from "./invoice/invoice.resolver";
import RoleResolver from "./role/role.resolver";

const getSchema = async () => {
  return await buildSchema({
    resolvers: [
      UserResolver,
      CreditDebitResolver,
      CategoryResolver,
      SubcategoryResolver,
      BankResolver,
      BankAccountResolver,
      VatResolver,
      StatusResolver,
      CommissionResolver,
      InvoiceResolver,
      RoleResolver,
    ],
    validate: true,
  });
};
export default getSchema;
