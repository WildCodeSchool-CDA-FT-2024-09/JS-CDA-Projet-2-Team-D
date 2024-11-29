import { Invoice } from "./invoice.entity";
import { Resolver, Query } from "type-graphql";

@Resolver(Invoice)
export default class InvoiceResolver {
  @Query(() => [Invoice])
  async getInvoices() {
    return Invoice.find();
  }
}
