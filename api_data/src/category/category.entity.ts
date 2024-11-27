import "reflect-metadata";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, ObjectType } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";

@ObjectType()
@Entity()
export class Category extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  @Column({ nullable: false, unique: true, type: "varchar", width: 30 })
  label: string;

  // @Field()
  // @Column()
  // credit_debit_id: number;
}
