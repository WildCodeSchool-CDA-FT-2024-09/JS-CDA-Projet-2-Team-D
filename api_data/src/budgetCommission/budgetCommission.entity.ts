import { Entity, ManyToOne, Column, PrimaryColumn } from "typeorm";
import { Field } from "type-graphql";
import { Budget } from "../budget/budget.entity";
import { Commission } from "../commission/commission.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class BudgetCommission {
  @Field(() => Number)
  @PrimaryColumn()
  budgetId: number;

  @Field(() => Number)
  @PrimaryColumn()
  commissionId: number;

  @Field(() => Number)
  @Column({ nullable: false, type: "float" })
  @IsNotEmpty()
  amount: number;

  @ManyToOne(() => Budget, (budget) => budget.id)
  budget: Budget;

  @ManyToOne(() => Commission, (commission) => commission.id)
  commission: Commission;
}
