import {
  Entity,
  ManyToOne,
  Column,
  PrimaryColumn,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { Exercise } from "../exercise/exercise.entity";
import { Commission } from "../commission/commission.entity";
import { IsNotEmpty } from "class-validator";

@ObjectType()
@Entity()
export class Budget extends BaseEntity {
  @Field(() => Number)
  @PrimaryColumn({ name: "exerciseId" })
  exerciseId: number;

  @Field(() => Number)
  @PrimaryColumn({ name: "commissionId" })
  commissionId: number;

  @Field(() => Number)
  @Column({ name: "amount", nullable: false, type: "float" })
  @IsNotEmpty()
  amount: number;

  @Field(() => Exercise)
  @ManyToOne(() => Exercise, (exercise) => exercise.budgets, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "exerciseId" })
  exercise: Exercise;

  @Field(() => Commission)
  @ManyToOne(() => Commission, (commission) => commission.budgets, {
    onDelete: "CASCADE",
    eager: true,
  })
  @JoinColumn({ name: "commissionId" })
  commissions: Commission;
}
