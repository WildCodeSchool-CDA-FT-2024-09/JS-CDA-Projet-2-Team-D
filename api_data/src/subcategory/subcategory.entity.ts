import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Category } from "../category/category.entity";
import { Invoice } from "../invoice/invoice.entity";

@ObjectType()
@Entity()
export class Subcategory extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Column({
    nullable: false,
    type: "varchar",
    length: 30,
    transformer: {
      to: (value: string) => value.toUpperCase(),
      from: (value: string) => value,
    },
  })
  code: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @Column({ nullable: false, type: "varchar", length: 30 })
  label: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.id)
  category: Category;

  @Field(() => [Invoice])
  @OneToMany(() => Invoice, (invoice) => invoice.subcategory)
  invoices: Invoice[];
}
