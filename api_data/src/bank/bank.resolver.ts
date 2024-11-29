import { Query, Resolver } from "type-graphql";
import { Bank } from "./bank.entity";

@Resolver(Bank)
export default class BankResolver {
  // Methode GET pour toutes les banques
  @Query(() => [Bank])
  async getBanks() {
    const banks = await Bank.find({});
    return banks;
  }
}
