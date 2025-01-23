import "reflect-metadata";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { IsNotEmpty, IsString, Length, IsNumber, Min } from "class-validator";
import { Field, Float, Int, ObjectType } from "type-graphql";
import { Bank } from "../bank/bank.entity";
import { Invoice } from "../invoice/invoice.entity";

@ObjectType()
@Entity()
export class BankAccount extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  @Column({ nullable: false, type: "varchar", length: 50 })
  name: string;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: "varchar", length: 50 })
  account_number: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0)
  @Column({ nullable: false, type: "float" })
  balance: number;

  @Field(() => Bank, { nullable: true })
  @ManyToOne(() => Bank, (bank) => bank.bankAccounts)
  bank?: Bank;

  @Field(() => [Invoice], { nullable: true })
  @OneToMany(() => Invoice, (invoice) => invoice.bankAccount)
  invoices: Invoice[];
}
