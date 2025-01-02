import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { IsNotEmpty, IsString, Length, IsDate } from "class-validator";
import { Budget } from "../budget/budget.entity";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Column({ nullable: false, unique: true, type: "varchar", length: 100 })
  label: string;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  @Column({ type: "timestamp" })
  start_date: Date;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  @Column({ type: "timestamp" })
  end_date: Date;

  @Field(() => [Budget])
  @OneToMany(() => Budget, (budget) => budget.exercise)
  budgets: Budget[];
}
