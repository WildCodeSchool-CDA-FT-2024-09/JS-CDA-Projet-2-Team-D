import { Commission } from "./commission.entity";
import { Resolver, Query, Arg } from "type-graphql";
import { Invoice } from "../invoice/invoice.entity";

@Resolver(Commission)
export default class CommissionResolver {
  @Query(() => [Commission])
  async getCommissions() {
    return Commission.find();
  }
  @Query(() => [Invoice])
  async getInvoicesByCommissionId(
    @Arg("commissionId") commissionId: number,
    @Arg("budgetId") budgetId: number,
    @Arg("offset", { defaultValue: 0 }) offset: number,
    @Arg("limit", { defaultValue: 10 }) limit: number
  ) {
    //SELECT * FROM invoice WHERE commission_id = id
    try {
      const invoices = await Invoice.find({
        where: {
          commission: {
            id: commissionId,
            budgetCommissions: {
              budget: {
                id: budgetId,
              },
            },
          },
        },
        relations: [
          "invoice",
          "commission.budgetCommissions",
          "commission.budgetCommissions.budget",
          "status",
          "vat",
          "creditDebit",
        ],
        order: {
          date: "DESC",
        },
        take: limit, // Nombre maximum de factures
        skip: offset, // Déplacement dans les résultats
      });
      return invoices;
    } catch (error) {
      console.error("Error fetching invoices by commission ID:", error);
      throw new Error("Unable to fetch invoices for the given commission ID.");
    }
  }
}

// query GetInvoicesByCommissionId($commissionId: Float!, $budgetId: Float!, $limit: Float!, $offset: Float!) {
//   getInvoicesByCommissionId(commissionId: $commissionId, budgetId: $budgetId, limit: $limit, offset: $offset) {
//     commission {
//       budgetCommissions {
//         amount
//         budget {
//           label
//           id
//           end_date
//           start_date
//         }
//       }
//     }
//     id
//     invoiceNumber
//     label
//     date
//     price_without_vat
//     vat {
//       rate
//       id
//       label
//     }
//     status {
//       label
//       id
//     }
//   }
// }

// {
//   "commissionId": 4,
//   "budgetId": 1,
//   "limit": 10,
//   "offset": 0
// }
