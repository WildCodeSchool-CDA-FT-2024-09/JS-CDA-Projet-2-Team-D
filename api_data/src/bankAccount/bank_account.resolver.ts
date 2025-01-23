import { Query, Resolver, Authorized, Mutation, Arg } from "type-graphql";
import { BankAccount } from "./bank_account.entity";

@Resolver(BankAccount)
export default class BankAccountResolver {
  @Authorized(["1", "2"])
  @Query(() => [BankAccount])
  async getBankAccounts() {
    const bankAccounts = await BankAccount.find({
      order: {
        id: "ASC",
      },
    });
    return bankAccounts;
  }

  @Authorized(["2"])
  @Mutation(() => BankAccount)
  async updateBalance(
    @Arg("bankAccountId") bankAccountId: number,
    @Arg("amount") amount: number
  ) {
    const bankAccount = await BankAccount.findOne({
      where: { id: bankAccountId },
    });
    if (!bankAccount) {
      throw new Error("Bank account not found");
    }

    bankAccount.balance += amount;
    await bankAccount.save();

    return bankAccount;
  }
}
