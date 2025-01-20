import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class RejectInvoiceResponse {
  @Field(() => Int)
  id!: number;

  @Field({ nullable: true })
  reason?: string;

  @Field(() => Boolean)
  emailSent!: boolean;
}
