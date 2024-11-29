import { Commission } from "./commission.entity";
import { Resolver, Query } from "type-graphql";

@Resolver(Commission)
export default class CommissionResolver {
  @Query(() => [Commission])
  async getCommissions() {
    return Commission.find();
  }
}
