import { IsBoolean, IsNotEmpty, IsString, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Status } from "../status/status.entity";
import { Vat } from "../vat/vat.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Subcategory } from "../subcategory/subcategory.entity";
import { Commission } from "../commission/commission.entity";
import { BankAccount } from "../bankAccount/bank_account.entity";

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
  @ManyToOne(() => Status, (status) => status.id)
  status: Status;

  @Field(() => Vat)
  @ManyToOne(() => Vat, (vat) => vat.id)
  vat: Vat;

  @Field(() => CreditDebit)
  @ManyToOne(() => CreditDebit, (creditDebit) => creditDebit.id)
  creditDebit: CreditDebit;

  @Field(() => Subcategory)
  @ManyToOne(() => Subcategory, (subcategory) => subcategory.id)
  subcategory: Subcategory;

  @Field(() => Commission)
  @ManyToOne(() => Commission, (commission) => commission.id)
  commission: Commission;

  @Field(() => BankAccount)
  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.id)
  bankAccount: BankAccount;
}
