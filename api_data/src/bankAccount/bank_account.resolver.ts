import { Query, Resolver } from "type-graphql";
import { BankAccount } from "./bank_account.entity";

@Resolver(BankAccount)
export default class BankAccountResolver {
  @Query(() => [BankAccount])
  async getBankAccounts() {
    const bankAccounts = await BankAccount.find({});
    return bankAccounts;
  }
}
