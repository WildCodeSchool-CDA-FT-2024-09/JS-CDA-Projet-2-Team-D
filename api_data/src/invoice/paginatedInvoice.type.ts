import { ObjectType, Field, Int, Float } from "type-graphql";
import { Invoice } from "./invoice.entity";

@ObjectType()
export class PaginatedInvoices {
  @Field(() => [Invoice])
  invoices: Invoice[];

  @Field(() => Int)
  totalCount: number;

  @Field(() => Float, { nullable: true })
  totalAmount?: number | null;
}
