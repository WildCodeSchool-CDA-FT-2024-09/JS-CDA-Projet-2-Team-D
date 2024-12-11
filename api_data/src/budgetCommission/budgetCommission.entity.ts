import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Budget } from "../budget/budget.entity";
import { Commission } from "../commission/commission.entity";
import { IsNotEmpty } from "class-validator";

@ObjectType()
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

  @Field(() => Budget)
  @ManyToOne(() => Budget, (budget) => budget.budgetCommissions, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "budgetId" })
  budget: Budget;

  @Field(() => Commission)
  @ManyToOne(() => Commission, (commission) => commission.budgetCommissions, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "commissionId" })
  commission: Commission;
}
