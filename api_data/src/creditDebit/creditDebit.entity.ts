import { IsNotEmpty, IsString, Length } from "class-validator";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Invoice } from "../invoice/invoice.entity";
import { Category } from "../category/category.entity";

@ObjectType()
@Entity()
export class CreditDebit extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: "varchar", length: 30 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  label: string;

  @Field(() => [Invoice])
  @OneToMany(() => Invoice, (invoice) => invoice.id)
  invoices: Invoice[];

  @Field(() => [Category])
  @OneToMany(() => Category, (category) => category.creditDebit)
  categories: Category[];
}
