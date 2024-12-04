import { Invoice } from "./invoice.entity";
import { Resolver, Query, Arg } from "type-graphql";

@Resolver(Invoice)
export default class InvoiceResolver {
  @Query(() => [Invoice])
  async getInvoicesByCommissionId(@Arg("commissionId") commissionId: number) {
    try {
      return await Invoice.find({
        where: { commission: { id: commissionId } },
        relations: ["commission", "status", "vat", "creditDebit"],
      });
    } catch (error) {
      console.error("Error fetching invoices by commission ID:", error);
      throw new Error("Unable to fetch invoices for the given commission ID.");
    }
  }
}
