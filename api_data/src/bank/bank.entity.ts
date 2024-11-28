import "reflect-metadata";
import {
  BaseEntity,
  OneToMany,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { BankAccount } from "../bankAccount/bank_account.entity";

@ObjectType()
@Entity()
export class Bank extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, type: "varchar", length: 50 })
  label: string;

  @Field(() => [BankAccount])
  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.bank)
  bankAccounts: BankAccount[];
}
