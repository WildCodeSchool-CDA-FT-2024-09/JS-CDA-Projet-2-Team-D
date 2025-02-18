import "reflect-metadata";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  ManyToMany,
  JoinTable,
  DeleteDateColumn,
  Index,
} from "typeorm";
import { Field, ObjectType, Int } from "type-graphql";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from "class-validator";
import { Role } from "../role/role.entity";
import { Commission } from "../commission/commission.entity";
import { Invoice } from "../invoice/invoice.entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 150)
  @Column({ nullable: false, unique: true, type: "varchar", length: 150 })
  @Index({ unique: true })
  email: string;

  @Field(() => String)
  @IsString()
  @Length(1, 50)
  @Column({ nullable: true, type: "varchar", length: 50 })
  firstname: string;

  @Field(() => String)
  @IsString()
  @Length(1, 50)
  @Column({ nullable: true, type: "varchar", length: 50 })
  lastname: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Column({ nullable: false, type: "varchar" })
  password: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @Column({ nullable: true, type: "varchar", default: null })
  resetPasswordToken: string | null;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true, type: "timestamp", default: null })
  resetPasswordExpiry: Date | null;

  @Field(() => [Role])
  @ManyToMany(() => Role, (role: Role) => role.users)
  @JoinTable()
  roles: Role[];

  @Field(() => [Commission], { nullable: true })
  @ManyToMany(() => Commission, (commission: Commission) => commission.users)
  @JoinTable()
  commissions?: Commission[];

  @Field(() => [Invoice])
  @OneToMany(() => Invoice, (invoice: Invoice) => invoice.id)
  invoices: Invoice[];

  @Field(() => String, { nullable: true })
  @DeleteDateColumn()
  deletedAt: Date | null;
}
