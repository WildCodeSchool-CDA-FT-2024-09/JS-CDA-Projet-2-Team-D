import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { User } from "../user/user.entity";
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
  @OneToMany(() => Budget, (budget) => budget.commissions)
  budgets: Budget[];

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.commissions)
  users: User[];
}
