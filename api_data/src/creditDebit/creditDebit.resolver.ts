import { Resolver, Query } from "type-graphql";
import { CreditDebit } from "./creditDebit.entity";

@Resolver(CreditDebit)
export default class CreditDebitResolver {
  @Query(() => [CreditDebit])
  async getCreditDebits(): Promise<CreditDebit[]> {
    return await CreditDebit.find();
  }
}
