import { Query, Resolver, Authorized } from "type-graphql";
import { Bank } from "./bank.entity";

@Resolver(Bank)
export default class BankResolver {
  @Authorized(["1", "2"])
  @Query(() => [Bank])
  async getBanks() {
    const banks = await Bank.find({
      relations: ["bankAccounts"],
      order: {
        id: "ASC",
      },
    });
    return banks;
  }
}
