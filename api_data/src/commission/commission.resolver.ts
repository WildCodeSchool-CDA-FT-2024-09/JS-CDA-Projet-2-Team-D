import { Budget } from "../budget/budget.entity";
import { Exercise } from "../exercise/exercise.entity";
import { Invoice } from "../invoice/invoice.entity";
import { Commission } from "./commission.entity";
import { Resolver, Query, Arg } from "type-graphql";

@Resolver(Commission)
export default class CommissionResolver {
  @Query(() => [Commission])
  async getCommissions() {
    return Commission.find();
  }
  @Query(() => [Invoice])
  async getInvoicesByCommissionId(
    @Arg("commissionId") commissionId: number,
    @Arg("offset", { defaultValue: 0 }) offset: number,
    @Arg("limit", { defaultValue: 10 }) limit: number
  ) {
    try {
      const lastExercise = await Exercise.findOne({
        where: {},
        order: { end_date: "DESC" },
      });

      if (!lastExercise) {
        throw new Error("No exercise found.");
      }

      const budget = await Budget.findOne({
        where: {
          commissionId: commissionId,
          exerciseId: lastExercise.id,
        },
      });

      if (!budget) {
        throw new Error(
          `No budget found for commission ${commissionId} in exercise ${lastExercise.id}.`
        );
      }

      const invoices = await Invoice.find({
        where: {
          commission: { id: commissionId },
        },
        relations: ["commission", "commission.budgets", "vat", "status"],
        order: { date: "DESC" },
        take: limit,
        skip: offset,
      });

      return invoices;
    } catch (error) {
      console.error("Error fetching invoices by commission ID:", error);
      throw new Error("Unable to fetch invoices for the given commission ID.");
    }
  }
}
