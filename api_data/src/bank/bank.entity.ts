import "reflect-metadata";
import {
  BaseEntity,
  OneToMany,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { BankAccount } from "../bankAccount/bank_account.entity";

@ObjectType()
@Entity()
export class Bank extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Column({ nullable: false, unique: true, type: "varchar", length: 50 })
  label: string;

  @Field(() => [BankAccount], { nullable: true })
  @OneToMany(() => BankAccount, (bankAccount) => bankAccount.bank)
  bankAccounts: BankAccount[];
}
