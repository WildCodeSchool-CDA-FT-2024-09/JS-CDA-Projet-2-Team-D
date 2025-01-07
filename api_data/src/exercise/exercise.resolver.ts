import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { validate } from "class-validator";
import { Exercise } from "./exercise.entity";
import { Budget } from "../budget/budget.entity";
import { Commission } from "../commission/commission.entity";
import { ExerciseInput } from "./exercise.type";

@Resolver(Exercise)
export default class ExerciseResolver {
  @Query(() => [Exercise])
  async getExercises() {
    const exercises = await Exercise.find({
      relations: ["budgets"],
      order: {
        id: "DESC",
      },
    });

    return exercises;
  }

  @Mutation(() => Exercise)
  async createNewExercise(@Arg("data") data: ExerciseInput) {
    try {
      const exercise = new Exercise();
      exercise.label = data.label;
      exercise.start_date = data.start_date;
      exercise.end_date = data.end_date;

      const error = await validate(exercise);

      if (error.length > 0)
        throw new Error(
          `Erreur dans la validation des données de l'exercice : ${error}`
        );

      const newExercise = await exercise.save();

      // Init all commissions' budgets
      const commissions = await Commission.find();

      commissions.forEach(async (commission) => {
        const budget = new Budget();
        budget.commissionId = commission.id;
        budget.exerciseId = newExercise.id;
        budget.amount = 0;

        await budget.save();
      });

      return newExercise;
    } catch (error) {
      console.error(error);
      throw new Error("Problème avec la création d'un nouvel exercice.");
    }
  }
}
