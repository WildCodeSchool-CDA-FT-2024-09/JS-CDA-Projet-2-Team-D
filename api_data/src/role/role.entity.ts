import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";
import { User } from "../user/user.entity";

@ObjectType()
@Entity()
export class Role extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  @Column({ nullable: false, unique: true, type: "varchar", width: 30 })
  label: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user: User) => user.roles)
  users: User[];
}
