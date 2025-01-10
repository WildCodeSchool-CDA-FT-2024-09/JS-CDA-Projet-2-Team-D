import { Resolver, Query, Authorized } from "type-graphql";
import { Vat } from "./vat.entity";

@Resolver(Vat)
export default class VatResolver {
  @Authorized(["1", "2", "3"])
  @Query(() => [Vat])
  async getVats() {
    return await Vat.find({ relations: ["invoices"] });
  }
}
