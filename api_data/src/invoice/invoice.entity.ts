import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
} from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status } from "../status/status.entity";
import { Vat } from "../vat/vat.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Subcategory } from "../subcategory/subcategory.entity";
import { Commission } from "../commission/commission.entity";
import { BankAccount } from "../bankAccount/bank_account.entity";
import { User } from "../user/user.entity";

@ObjectType()
@Entity()
export class Invoice extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @Column({ nullable: false, type: "float" })
  @IsNotEmpty()
  price_without_vat: number;

  @Field(() => String)
  @Column({ nullable: false, type: "varchar", length: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  label: string;

  @Field(() => String)
  @Column({ nullable: false, type: "varchar", length: 30 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  receipt: string;

  @Field(() => String)
  @Column({ nullable: false, type: "varchar", length: 250 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 250)
  info: string;

  @Field(() => Boolean)
  @Column({ nullable: false, type: "boolean" })
  @IsBoolean()
  @IsNotEmpty()
  paid: boolean;

  @Field(() => Status)
  @ManyToOne(() => Status, (status) => status.invoices, {
    eager: true,
    nullable: false,
  })
  status: Status;

  @Field(() => Vat)
  @ManyToOne(() => Vat, (vat) => vat.invoices, { eager: true, nullable: false })
  vat: Vat;

  @Field(() => Date)
  @Column({ nullable: false, type: "timestamp" })
  date: Date;

  @Field(() => CreditDebit)
  @ManyToOne(() => CreditDebit, (creditDebit) => creditDebit.id)
  creditDebit: CreditDebit;

  @Field(() => Subcategory, { nullable: true })
  @ManyToOne(() => Subcategory, (subcategory) => subcategory.id, {
    nullable: true,
  })
  subcategory?: Subcategory;

  @Field(() => Commission, { nullable: true })
  @ManyToOne(() => Commission, (commission) => commission.id, {
    nullable: true,
  })
  commission?: Commission;

  @Field(() => BankAccount, { nullable: true })
  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.invoices, {
    nullable: true,
    eager: true,
  })
  @IsOptional()
  @JoinColumn({ name: "bankAccountId" })
  bankAccount?: BankAccount;

  @Field(() => String)
  @Column({ nullable: false, type: "varchar" })
  invoiceNumber: string;

  @Field(() => User, { nullable: true })
  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  user?: User;
}
