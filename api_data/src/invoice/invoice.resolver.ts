import { Invoice } from "./invoice.entity";
import { Resolver, Query, Arg } from "type-graphql";

@Resolver(Invoice)
export default class InvoiceResolver {
  @Query(() => [Invoice])
  async getInvoicesByCommissionId(@Arg("commissionId") commissionId: number) {
    console.info(commissionId);
    return Invoice.find();
  }
}
