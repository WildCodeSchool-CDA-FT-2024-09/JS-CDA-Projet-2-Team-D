import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";
import { Field, ObjectType, Float } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  // OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity()
export class Vat extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column({ nullable: false, unique: true, type: "varchar", length: 30 })
  @IsString()
  @IsNotEmpty()
  @Length(1, 30)
  label: string;

  @Field(() => Float)
  @Column({ nullable: false, type: "float" })
  @IsNumber()
  @Min(0)
  @Max(100)
  rate: number;

  // @Field(() => [Invoice])
  // @OneToMany(() => Invoice, (invoice) => invoice.creditDebit)
  // invoices: Invoice[];
}
