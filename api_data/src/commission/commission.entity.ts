import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Budget } from "../budget/budget.entity";

@ObjectType()
@Entity()
export class Commission extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @Column({ nullable: false, unique: true, type: "varchar", length: 30 })
  name: string;

  @Field(() => [Budget])
  @ManyToMany(() => Budget, (budget) => budget.commissions)
  budgets: Budget[];
}
