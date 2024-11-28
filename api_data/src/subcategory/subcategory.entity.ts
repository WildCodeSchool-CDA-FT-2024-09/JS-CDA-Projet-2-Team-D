import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { Category } from "@/category/category.entity";

@ObjectType()
@Entity()
export class Subcategory extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Number)
  @IsNumber()
  @Column({ nullable: false, type: "int" })
  category_id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false, type: "varchar", length: 30 })
  code: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @Column({ nullable: false, unique: true, type: "varchar", length: 30 })
  label: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;
}
