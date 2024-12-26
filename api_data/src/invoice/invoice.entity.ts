import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  Length,
  IsOptional,
  IsPositive,
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
  @IsPositive()
  price_without_vat: number;

  @Field(() => String)
  @Column({ nullable: false, type: "varchar", length: 50 })
  @IsString()
  @Length(1, 50)
  label: string;

  @Field(() => String)
  @Column({ nullable: false, type: "varchar", length: 50 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  receipt?: string | null;

  @Field(() => String)
  @Column({ nullable: true, type: "varchar", length: 250 })
  @IsString()
  @IsOptional()
  @Length(0, 250)
  info: string | null;

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
  @ManyToOne(() => CreditDebit, (creditDebit) => creditDebit.invoices, {
    nullable: false,
  })
  creditDebit: CreditDebit;

  @Field(() => Subcategory, { nullable: false })
  @ManyToOne(() => Subcategory, (subcategory) => subcategory.invoices, {
    nullable: false,
  })
  subcategory: Subcategory;

  @Field(() => Commission, { nullable: false })
  @ManyToOne(() => Commission, (commission) => commission.id, {
    nullable: false,
  })
  commission: Commission;

  @Field(() => BankAccount, { nullable: true })
  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.invoices, {
    nullable: true,
    eager: true,
  })
  @IsOptional()
  @JoinColumn({ name: "bankAccountId" })
  bankAccount?: BankAccount | null;

  @Field(() => String)
  @Column({ nullable: true, type: "varchar" })
  @IsOptional()
  invoiceNumber: string | null;

  @Field(() => User, { nullable: false })
  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  user: User;
}
