import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class InvoiceInput {
  @Field()
  commissions: string;

  @Field()
  date: Date;

  @Field()
  subcategory_id: number;

  @Field()
  clientId: number;

  @Field()
  label: string;

  @Field()
  type: string;

  @Field()
  price_without_vat: number;

  @Field()
  vat_id: number;

  @Field()
  receipt: string;

  @Field()
  paid: boolean;

  @Field()
  info: string;
}

@ObjectType()
export class Invoice {
  @Field(() => String)
  id: string;
  commissions!: string;
  date!: Date;
  subcategory_id!: number;
  clientId!: number;
  label!: string;
  type!: string;
  price_without_vat!: number;
  vat_id!: number;
  total!: number;
  receipt!: string;
  paid!: boolean;
  info!: string;
}
