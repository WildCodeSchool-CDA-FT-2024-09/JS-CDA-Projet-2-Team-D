import { Resolver, Query, Arg } from "type-graphql";
import { Invoice } from "./invoice.entity";
import { Subcategory } from "../subcategory/subcategory.entity";
import { Status } from "../status/status.entity";
import { Vat } from "../vat/vat.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Commission } from "../commission/commission.entity";
import { BankAccount } from "../bankAccount/bank_account.entity";
import { User } from "../user/user.entity";

@Resolver(Invoice)
export default class InvoiceResolver {
  @Query(() => [Invoice])
  async getInvoices(): Promise<Invoice[]> {
    try {
      const invoices = await Invoice.find({
        relations: [
          "bankAccount",
          "subcategory",
          "creditDebit",
          "commission",
          "status",
          "vat",
          "user",
        ],
      });
      console.info("Raw invoices from database:", invoices);

      // Déclarer validInvoices comme un tableau d'Invoice
      const validInvoices: Invoice[] = invoices.map((invoice) => {
        // Vérification pour Subcategory
        if (!invoice.subcategory) {
          console.warn(
            `Facture ID ${invoice.id} n'a pas de sous-catégorie, valeur par défaut utilisée`
          );
          invoice.subcategory = {
            id: 0,
            label: "Sous-catégorie non définie",
          } as Subcategory;
        }

        // Vérification pour Status
        if (!invoice.status) {
          console.warn(
            `Facture ID ${invoice.id} n'a pas de statut, valeur par défaut utilisée`
          );
          invoice.status = { id: 1, label: "Non défini" } as Status;
        }

        // Vérification pour Vat
        if (!invoice.vat) {
          console.warn(
            `Facture ID ${invoice.id} n'a pas de TVA, valeur par défaut utilisée`
          );
          invoice.vat = { id: 0, rate: 0, label: "Pas de TVA" } as Vat;
        }

        // Vérification pour CreditDebit
        if (!invoice.creditDebit) {
          console.warn(
            `Facture ID ${invoice.id} n'a pas de CreditDebit, valeur par défaut utilisée`
          );
          invoice.creditDebit = {
            id: 0,
            label: "Non défini",
          } as CreditDebit;
        }

        // Vérification pour Commission
        if (!invoice.commission) {
          console.warn(
            `Facture ID ${invoice.id} n'a pas de Commission, valeur par défaut utilisée`
          );
          invoice.commission = { id: 0, name: "Non défini" } as Commission;
        }

        // Vérification pour BankAccount
        if (!invoice.bankAccount) {
          console.warn(
            `Facture ID ${invoice.id} n'a pas de compte bancaire, valeur par défaut utilisée`
          );
          invoice.bankAccount = {
            id: 0,
            bankName: "Non défini",
          } as unknown as BankAccount;
        }

        // Vérification pour User
        if (!invoice.user) {
          console.warn(
            `Facture ID ${invoice.id} n'a pas d'utilisateur, valeur par défaut utilisée`
          );
          invoice.user = {
            id: 0,
            firstname: "Non défini",
            lastname: "Non défini",
          } as User;
        }

        // Retourner chaque facture modifiée
        return invoice;
      });

      // Retourner la liste complète des factures valides
      return validInvoices;
    } catch (error) {
      console.error("Erreur lors de la récupération des factures:", error);
      throw new Error("Erreur lors de la récupération des factures");
    }
  }
  @Query(() => [Invoice])
  async getInvoicesByCommissionId(@Arg("commissionId") commissionId: number) {
    try {
      return await Invoice.find({
        where: { commission: { id: commissionId } },
        relations: ["commission", "status", "vat", "creditDebit"],
      });
    } catch (error) {
      console.error("Error fetching invoices by commission ID:", error);
      throw new Error("Unable to fetch invoices for the given commission ID.");
    }
  }
}
