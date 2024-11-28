import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { Field, Float, Int, ObjectType } from "type-graphql";
import { Bank } from "../bank/bank.entity";

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

  @Field(() => Float)
  @Column({ nullable: false, unique: true, type: "float" })
  balance: number;

  @Field(() => Bank)
  @ManyToOne(() => Bank, (bank) => bank.bankAccounts)
  bank: Bank;
}
