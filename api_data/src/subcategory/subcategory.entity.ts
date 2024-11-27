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

  @Field()
  @IsNumber()
  @Column({ nullable: false, type: "int" })
  category_id: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: "Le code de la sous-catégorie est obligatoire" })
  @Column({ nullable: false, type: "varchar", width: 30 })
  code: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: "Le nom de la sous-catégorie est obligatoire" })
  @Length(1, 30, {
    message:
      "Le nom de la sous-catégorie doit contenir entre 1 et 30 caractères",
  })
  @Column({ nullable: false, unique: true, type: "varchar", width: 30 })
  label: string;

  @Field(() => Category)
  @ManyToOne(() => Category, (category) => category.subcategories)
  category: Category;
}
