import { Between } from "typeorm";
import { Exercise } from "../exercise/exercise.entity";
import { Invoice } from "../invoice/invoice.entity";
import { Commission } from "./commission.entity";
import { Resolver, Query, Arg, Authorized } from "type-graphql";
import { PaginatedInvoices } from "../invoice/paginatedInvoice.type";
import redisClient from "../../redis.config";

@Resolver(Commission)
export default class CommissionResolver {
  @Authorized(["1", "2", "3"])
  @Query(() => [Commission])
  async getCommissions() {
    return Commission.find();
  }

  @Authorized(["1", "2", "3"])
  @Query(() => PaginatedInvoices)
  async getInvoicesByCommissionId(
    @Arg("commissionId") commissionId: number,
    @Arg("offset", { defaultValue: 0 }) offset: number,
    @Arg("limit", { defaultValue: 5 }) limit: number
  ): Promise<PaginatedInvoices> {
    try {
      const cacheKey = commissionId
        ? `invoicesByCommissionId:keyword:${commissionId}`
        : "invoicesByCommissionId:all";

      const cachedInvoicesByCommissionId = await redisClient.get(cacheKey);
      if (cachedInvoicesByCommissionId) {
        return JSON.parse(cachedInvoicesByCommissionId);
      }

      const [lastExercise] = await Exercise.find({
        order: { end_date: "DESC" },
        take: 1,
      });
      if (!lastExercise) {
        throw new Error("Pas d'exercice trouvé");
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
        throw new Error("Pas de factures trouvées pour cette commission.");
      }

      const allInvoices = await Invoice.find({
        where: {
          commission: { id: commissionId },
          date: Between(lastExercise.start_date, lastExercise.end_date),
        },
        relations: ["creditDebit"],
      });

      const totalAmount = Number(
        allInvoices
          .reduce((sum, invoice) => {
            const amount = Number(invoice.amount_with_vat);
            return sum + (invoice.creditDebit.id === 2 ? -amount : amount);
          }, 0)
          .toFixed(2)
      );

      const result = { invoices, totalCount, totalAmount };

      await redisClient.set(cacheKey, JSON.stringify(result), {
        EX: 60,
      });

      return result;
    } catch (error) {
      console.error("Error fetching invoices by commission ID:", error);
      throw new Error(
        "Impossible de récupérer les factures pour cette commission."
      );
    }
  }
}
