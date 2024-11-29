import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Field, ObjectType, Int, GraphQLISODateTime } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Commission } from "../commission/commission.entity";

@ObjectType()
@Entity()
export class Budget extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Column({ nullable: false, unique: true, type: "varchar", length: 100 })
  label: string;

  @Field(() => GraphQLISODateTime) // Expose as a GraphQL ISO 8601 DateTime
  @Column({ type: "timestamp" })
  start_date: Date;

  @Field(() => GraphQLISODateTime) // Expose as a GraphQL ISO 8601 DateTime
  @Column({ type: "timestamp" })
  end_date: Date;

  @Field(() => [Commission])
  @ManyToMany(() => Commission, (commission) => commission.budgets)
  commissions: Commission[];
}
