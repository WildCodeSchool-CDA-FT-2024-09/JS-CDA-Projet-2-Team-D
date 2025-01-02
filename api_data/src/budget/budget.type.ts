import { ObjectType, Field } from "type-graphql";
import { Budget } from "./budget.entity";

@ObjectType()
export class BudgetOverview {
  @Field(() => [Budget])
  budgets: Budget[];

  @Field(() => Number)
  globalBudget: number;
}
