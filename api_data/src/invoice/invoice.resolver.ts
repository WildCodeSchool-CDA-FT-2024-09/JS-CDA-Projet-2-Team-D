import { Resolver, Mutation, Arg } from "type-graphql";
import { Invoice } from "./invoice.entity";
import { InvoiceInput } from "./invoice.schema";

@Resolver(Invoice)
export default class InvoiceResolver {
  @Mutation(() => Invoice)
  async createInvoice(@Arg("input") input: InvoiceInput): Promise<Invoice> {
    const newInvoice = Invoice.create({
      ...input,
    });

    await newInvoice.save();

    return newInvoice;
  }
}
