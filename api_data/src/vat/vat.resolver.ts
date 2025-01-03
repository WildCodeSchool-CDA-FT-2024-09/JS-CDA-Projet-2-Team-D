import { Resolver, Query } from "type-graphql";
import { Vat } from "./vat.entity";

@Resolver(Vat)
export default class VatResolver {
  @Query(() => [Vat])
  async getVats() {
    return await Vat.find({ relations: ["invoices"] });
  }
}
