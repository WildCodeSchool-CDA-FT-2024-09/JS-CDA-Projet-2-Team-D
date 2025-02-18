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
import { BudgetResolver } from "./budget/budget.resolver";
import ExerciseResolver from "./exercise/exercise.resolver";

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
      BudgetResolver,
      ExerciseResolver,
    ],
    validate: true,
    authChecker: ({ context }, rolesId: string[]): boolean => {
      /** context.loggedInUser
       * {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            roles: [ { id: 1 }, { id: 2 }, { id: 3 } ] // [admin: 1, compta: 2, commission: 3]
          },
       */

      const hasRole = context.loggedInUser.roles.some((role: { id: number }) =>
        rolesId.includes(String(role.id))
      );

      return hasRole;
    },
  });
};
export default getSchema;
