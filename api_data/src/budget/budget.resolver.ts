import { Resolver, Query, Arg, Int } from "type-graphql";
import { Budget } from "./budget.entity";
import { Exercise } from "../exercise/exercise.entity";

@Resolver(Budget)
export class BudgetResolver {
  @Query(() => Budget, { nullable: true })
  async getCurrentBudgetByCommissionID(
    @Arg("commissionId", () => Int) commissionId: number
  ): Promise<Budget | null> {
    try {
      const lastExercise = await Exercise.find({
        order: { end_date: "DESC" },
        take: 1,
      });

      if (!lastExercise.length) {
        throw new Error("Aucun exercice trouvé.");
      }

      const exercise = lastExercise[0];

      const budget = await Budget.findOne({
        where: {
          commissionId: commissionId,
          exerciseId: exercise.id,
        },
        relations: ["commissions", "exercise"],
      });

      return budget || null;
    } catch (error) {
      console.error("Erreur :", error);
      throw new Error("Impossible de récupérer le dernier budget.");
    }
  }
}
