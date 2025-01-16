import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { validate } from "class-validator";
import { Exercise } from "./exercise.entity";
import { Budget } from "../budget/budget.entity";
import { Commission } from "../commission/commission.entity";
import { ExerciseInput } from "./exercise.type";

@Resolver(Exercise)
export default class ExerciseResolver {
  @Authorized(["1", "2", "3"])
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

  @Authorized(["1", "2", "3"])
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

  @Authorized(["1", "2", "3"])
  @Mutation(() => Exercise)
  async updateExercise(
    @Arg("exerciseId") exerciseId: number,
    @Arg("data") data: ExerciseInput
  ) {
    try {
      const exercise = await Exercise.findOneOrFail({
        where: { id: exerciseId },
      });

      exercise.label = data.label;
      exercise.start_date = data.start_date;
      exercise.end_date = data.end_date;

      const error = await validate(exercise);

      if (error.length > 0)
        throw new Error(
          `Erreur dans la validation des données de l'exercice : ${error}`
        );

      const newExercise = await exercise.save();

      return newExercise;
    } catch (error) {
      console.error(error);
      throw new Error("Problème avec la mise à jour de l'exercice.");
    }
  }

  @Authorized(["1", "2", "3"])
  @Query(() => Exercise)
  async getExerciseById(@Arg("exerciseId") exerciseId: number) {
    const exercise = await Exercise.findOneOrFail({
      where: { id: exerciseId },
    });

    if (!exercise) {
      throw new Error("L'exercise n'existe pas");
    }

    return exercise;
  }
}
