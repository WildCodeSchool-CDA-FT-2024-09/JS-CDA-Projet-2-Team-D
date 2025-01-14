import { Query, Resolver, Authorized, Mutation } from "type-graphql";
import { Bank } from "./bank.entity";

@Resolver(Bank)
export default class BankResolver {
  @Authorized(["1", "2"])
  @Query(() => [Bank])
  async getBanks() {
    const banks = await Bank.find({ relations: ["bankAccounts"] });
    return banks;
  }

  @Authorized(["2"])
  @Mutation(() => Bank)
  async addBank() {
    const bank = Bank.create({
      label: "New Bank",
      bankAccounts: [],
    });
    await bank.save();
    return bank;
  }
}
