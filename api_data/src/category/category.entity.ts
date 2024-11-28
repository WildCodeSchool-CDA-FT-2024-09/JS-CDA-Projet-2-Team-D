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

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @Column({ nullable: false, unique: true, type: "varchar", length: 30 })
  label: string;

  @Field(() => [Subcategory])
  @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
  subcategories: Subcategory[];

  // @Field()
  // @Column()
  // credit_debit_id: number;
}
