import { Entity, ManyToOne, Column, PrimaryColumn, JoinColumn } from "typeorm";
import { Field } from "type-graphql";
import { Exercise } from "../exercise/exercise.entity";
import { Commission } from "../commission/commission.entity";
import { IsNotEmpty } from "class-validator";

@Entity()
export class Budget {
  @Field(() => Number)
  @PrimaryColumn()
  exerciseId: number;

  @Field(() => Number)
  @PrimaryColumn()
  commissionId: number;

  @Field(() => Number)
  @Column({ nullable: false, type: "float" })
  @IsNotEmpty()
  amount: number;

  @Field(() => Exercise)
  @ManyToOne(() => Exercise, (exercise) => exercise.budgets, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "budgetId" })
  exercise: Exercise;

  @Field(() => Commission)
  @ManyToOne(() => Commission, (commission) => commission.budgets, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "commissionId" })
  commission: Commission;
}
