import { Query, Resolver, Authorized } from "type-graphql";
import { BankAccount } from "./bank_account.entity";

@Resolver(BankAccount)
export default class BankAccountResolver {
  @Authorized(["1", "2"])
  @Query(() => [BankAccount])
  async getBankAccounts() {
    const bankAccounts = await BankAccount.find({});
    return bankAccounts;
  }
}
