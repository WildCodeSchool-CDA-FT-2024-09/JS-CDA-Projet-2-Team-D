import { Resolver, Query, Authorized } from "type-graphql";
import { CreditDebit } from "./creditDebit.entity";

@Resolver(CreditDebit)
export default class CreditDebitResolver {
  @Authorized(["1", "2", "3"])
  @Query(() => [CreditDebit])
  async getCreditDebits(): Promise<CreditDebit[]> {
    return await CreditDebit.find();
  }
}
