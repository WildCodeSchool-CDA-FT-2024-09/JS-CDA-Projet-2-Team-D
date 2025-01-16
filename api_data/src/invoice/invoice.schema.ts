import { Field, InputType, ObjectType, Float, Int, ID } from "type-graphql";

@InputType()
export class InvoiceInput {
  @Field()
  label: string;

  @Field()
  price_without_vat: number;

  @Field()
  vat_id: number;

  @Field()
  total: number;

  @Field()
  paid: boolean;

  @Field()
  date: Date;

  @Field({ nullable: true })
  receipt?: string | null;

  @Field({ nullable: true })
  info?: string | null;

  @Field(() => Int)
  category_id: number;

  @Field(() => Int)
  subcategory_id: number;

  @Field(() => Int, { nullable: true })
  commission_id?: number;

  @Field(() => Int, { nullable: true })
  credit_debit_id?: number;

  @Field(() => Int, { nullable: true })
  status_id?: number;

  @Field(() => Int, { nullable: true })
  bank_act_id?: number | null;
}

@ObjectType()
export class Invoice {
  @Field(() => ID)
  id: string;

  @Field(() => Date)
  date: Date;

  @Field(() => String)
  label: string;

  @Field(() => Float)
  price_without_vat: number;

  @Field(() => Float)
  total: number;

  @Field(() => Boolean)
  paid: boolean;

  @Field(() => String)
  receipt: string;

  @Field(() => String, { nullable: true })
  info?: string | null;

  @Field(() => Int)
  category_id: number;

  @Field(() => Int)
  subcategory_id: number;

  @Field(() => Int)
  vat_id: number;

  @Field(() => Int, { nullable: true })
  commission_id?: number;

  @Field(() => Int, { nullable: true })
  credit_debit_id?: number;

  @Field(() => Int, { nullable: true })
  status_id?: number;

  @Field(() => Int, { nullable: true })
  bank_act_id?: number | null;

  @Field(() => Int)
  user_id: number;

  @Field(() => Int)
  amount_with_vat: number;
}
