import { ObjectType, Field, Int } from "type-graphql";
import { Invoice } from "./invoice.entity";

@ObjectType()
export class PaginatedInvoices {
  @Field(() => [Invoice])
  invoices: Invoice[];

  @Field(() => Int)
  totalCount: number;
}
