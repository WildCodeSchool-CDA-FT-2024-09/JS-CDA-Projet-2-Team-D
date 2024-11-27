import "reflect-metadata";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class BankAccount extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: "varchar", length: 50 })
  name: string;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: "varchar", length: 50 })
  account_number: string;

  @Field(() => Int)
  @Column({ nullable: false, unique: true, type: "varchar", length: 50 })
  balance: number;
}
