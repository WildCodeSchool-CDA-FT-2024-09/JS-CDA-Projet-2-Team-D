import { Resolver, Query } from "type-graphql";
// import { validate } from "class-validator";
import { Exercise } from "./exercise.entity";

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
}
