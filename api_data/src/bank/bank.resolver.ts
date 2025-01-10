import { Query, Resolver, Authorized } from "type-graphql";
import { Bank } from "./bank.entity";

@Resolver(Bank)
export default class BankResolver {
  @Authorized(["1", "2", "3"])
  @Query(() => [Bank])
  async getBanks() {
    const banks = await Bank.find({ relations: ["bankAccounts"] });
    return banks;
  }
}
