import { Query, Resolver } from "type-graphql";
import { BankAccount } from "./bank_account.entity";

@Resolver(BankAccount)
export default class BankAccountResolver {
  // Methode GET pour toutes les banques
  @Query(() => [BankAccount])
  async getfullbankAccounts() {
    const bankAccounts = await BankAccount.find({});
    return bankAccounts;
  }
}
