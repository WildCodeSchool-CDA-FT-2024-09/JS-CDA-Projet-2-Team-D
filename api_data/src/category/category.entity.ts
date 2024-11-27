import "reflect-metadata";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { Subcategory } from "../subcategory/subcategory.entity";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty({ message: "Le nom de la catégorie est obligatoire" })
  @Length(1, 30, {
    message: "Le nom de la catégorie doit contenir entre 1 et 30 caractères",
  })
  @Column({ nullable: false, unique: true, type: "varchar", width: 30 })
  label: string;

  @Field(() => [Subcategory])
  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  // @Field()
  // @Column()
  // credit_debit_id: number;
}
