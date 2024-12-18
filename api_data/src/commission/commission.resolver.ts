import { Between } from "typeorm";
import { Exercise } from "../exercise/exercise.entity";
import { Invoice } from "../invoice/invoice.entity";
import { Commission } from "./commission.entity";
import { Resolver, Query, Arg } from "type-graphql";
import { PaginatedInvoices } from "../invoice/paginatedInvoice.type";

@Resolver(Commission)
export default class CommissionResolver {
  @Query(() => [Commission])
  async getCommissions() {
    return Commission.find();
  }
  @Query(() => PaginatedInvoices)
  async getInvoicesByCommissionId(
    @Arg("commissionId") commissionId: number,
    @Arg("offset", { defaultValue: 0 }) offset: number,
    @Arg("limit", { defaultValue: 5 }) limit: number
  ): Promise<PaginatedInvoices> {
    try {
      const [lastExercise] = await Exercise.find({
        order: { end_date: "DESC" },
        take: 1,
      });
      if (!lastExercise) {
        throw new Error("No exercise found.");
      }

      const [invoices, totalCount] = await Invoice.findAndCount({
        where: {
          commission: { id: commissionId },
          date: Between(lastExercise.start_date, lastExercise.end_date),
        },
        relations: ["commission", "vat", "status", "creditDebit"],
        order: { date: "DESC" },
        take: limit,
        skip: offset,
      });
      if (!invoices.length) {
        throw new Error("No invoices found for the given commission.");
      }

      const allInvoices = await Invoice.find({
        where: {
          commission: { id: commissionId },
          date: Between(lastExercise.start_date, lastExercise.end_date),
        },
        relations: ["vat", "creditDebit"],
      });

      const totalAmount = allInvoices.reduce((sum, invoice) => {
        const vatRate = invoice.vat?.rate || 0;
        const ttc = invoice.price_without_vat * (1 + vatRate / 100);
        return sum + (invoice.creditDebit.id === 2 ? -ttc : ttc);
      }, 0);

      return { invoices, totalCount, totalAmount };
    } catch (error) {
      console.error("Error fetching invoices by co mmission ID:", error);
      throw new Error("Unable to fetch invoices for the given commission ID.");
    }
  }
}
