import { Resolver, Query, Arg, Authorized, Mutation } from "type-graphql";
import { Invoice } from "./invoice.entity";
import { Subcategory } from "../subcategory/subcategory.entity";
import { Status } from "../status/status.entity";
import { Vat } from "../vat/vat.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Commission } from "../commission/commission.entity";
import { BankAccount } from "../bankAccount/bank_account.entity";
import { User } from "../user/user.entity";
import { Equal } from "typeorm";
import { PaginatedInvoices } from "./paginatedInvoice.type";
import { Between } from "typeorm";
import { Exercise } from "../exercise/exercise.entity";
import redisClient from "../../redis.config";

@Resolver(Invoice)
export default class InvoiceResolver {
  @Authorized(["1", "2", "3"])
  @Query(() => [Invoice])
  async getInvoices(
    @Arg("keyword", { nullable: true }) keyword: string
  ): Promise<Invoice[]> {
    try {
      // Definition of cache key
      const cacheKey = keyword ? `invoices:keyword:${keyword}` : "invoices:all";

      // Redis cache check
      const cachedInvoices = await redisClient.get(cacheKey);
      if (cachedInvoices) {
        return JSON.parse(cachedInvoices);
      }

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

      // Processing invoices with default values
      const validInvoices: Invoice[] = invoices.map((invoice) => {
        const processedInvoice = { ...invoice };

        // Check for Subcategory
        if (!processedInvoice.subcategory) {
          processedInvoice.subcategory = {
            id: 0,
            label: "Sous-catégorie non définie",
          } as Subcategory;
        }

        // Check for Status
        if (!processedInvoice.status) {
          processedInvoice.status = { id: 1, label: "Non défini" } as Status;
        }

        // Check for Vat
        if (!processedInvoice.vat) {
          processedInvoice.vat = { id: 0, rate: 0, label: "Pas de TVA" } as Vat;
        }

        // Check for CreditDebit
        if (!processedInvoice.creditDebit) {
          processedInvoice.creditDebit = {
            id: 0,
            label: "Non défini",
          } as CreditDebit;
        }

        // Check for Commission
        if (!processedInvoice.commission) {
          processedInvoice.commission = {
            id: 0,
            name: "Non défini",
          } as Commission;
        }

        // Check for BankAccount
        if (!processedInvoice.bankAccount) {
          processedInvoice.bankAccount = {
            id: 0,
            bankName: "Non défini",
          } as unknown as BankAccount;
        }

        // Check for User
        if (!processedInvoice.user) {
          processedInvoice.user = {
            id: 0,
            firstname: "Non défini",
            lastname: "Non défini",
          } as User;
        }
        return processedInvoice as Invoice;
      });

      // Storage of the result in Redis
      await redisClient.set(cacheKey, JSON.stringify(validInvoices), {
        EX: 60, // Expiration after 1 min
      });

      // Return the full list of valid invoices
      return validInvoices;
    } catch (error) {
      console.error("Erreur lors de la récupération des factures:", error);
      throw new Error("Erreur lors de la récupération des factures");
    }
  }

  @Authorized(["1", "2", "3"])
  @Query(() => [Invoice])
  async getInvoicesToValidateOrRefused(): Promise<Invoice[]> {
    try {
      const invoices = await Invoice.find({
        where: [{ status: Equal(2) }, { status: Equal(3) }],
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

        return invoice;
      });

      const sortedInvoices = validInvoices.sort((a, b) => {
        if (a.status.id === 2 && b.status.id !== 2) return -1;
        if (a.status.id === 2 && b.status.id === 2) return 1;
        return 0;
      });

      return sortedInvoices;
    } catch (error) {
      console.error("Erreur lors de la récupération des factures:", error);

      throw new Error("Erreur lors de la récupération des factures");
    }
  }

  @Authorized(["1", "2", "3"])
  @Query(() => PaginatedInvoices)
  async getInvoicesByExercise(
    @Arg("exerciseId") exerciseId: number,
    @Arg("offset", { defaultValue: 0 }) offset: number,
    @Arg("limit", { defaultValue: 10 }) limit: number
  ): Promise<PaginatedInvoices> {
    try {
      const exercise = await Exercise.findOne({
        where: { id: exerciseId },
      });

      if (!exercise) {
        throw new Error("Exercise not found.");
      }

      const [invoices, totalCount] = await Invoice.findAndCount({
        where: {
          date: Between(exercise.start_date, exercise.end_date),
        },
        relations: [
          "bankAccount",
          "subcategory",
          "creditDebit",
          "commission",
          "status",
          "vat",
          "user",
        ],
        order: { date: "DESC" },
        take: limit,
        skip: offset,
      });

      return { invoices, totalCount };
    } catch (error) {
      console.error("Error fetching invoices by exercise:", error);
      throw new Error("Unable to fetch invoices for the given exercise.");
    }
  }

  @Authorized(["1", "2", "3"])
  @Query(() => Invoice)
  async getInvoiceById(@Arg("invoiceId") invoiceId: number): Promise<Invoice> {
    try {
      const invoice = await Invoice.findOne({
        where: { id: invoiceId },
        relations: [
          "bankAccount",
          "subcategory",
          "subcategory.category",
          "creditDebit",
          "commission",
          "status",
          "vat",
          "user",
        ],
      });

      if (!invoice) {
        throw new Error("Invoice not found.");
      }

      return invoice;
    } catch (error) {
      console.error("Error fetching invoice by ID:", error);
      throw new Error("Unable to fetch invoice for the given ID.");
    }
  }

  @Authorized(["2"])
  @Mutation(() => Invoice)
  async updateInvoiceStatus(
    @Arg("invoiceId") invoiceId: number,
    @Arg("statusId") statusId: number
  ): Promise<Invoice> {
    try {
      const invoice = await Invoice.findOne({
        where: { id: invoiceId },
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

      if (!invoice) {
        throw new Error("Invoice not found.");
      }

      const status = await Status.findOne({
        where: { id: statusId },
      });

      if (!status) {
        throw new Error("Status not found.");
      }

      invoice.status = status;

      await invoice.save();

      return invoice;
    } catch (error) {
      console.error("Error updating invoice status:", error);
      throw new Error("Unable to update invoice status.");
    }
  }

  @Authorized(["2"])
  @Mutation(() => Invoice)
  async associateBankAccountToInvoice(
    @Arg("invoiceId") invoiceId: number,
    @Arg("bankAccountId", { nullable: true }) bankAccountId?: number
  ): Promise<Invoice> {
    try {
      const invoice = await Invoice.findOne({
        where: { id: invoiceId },
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

      if (!invoice) {
        throw new Error("Invoice not found.");
      }

      if (bankAccountId) {
        const bankAccount = await BankAccount.findOne({
          where: { id: bankAccountId },
        });

        if (!bankAccount) {
          throw new Error("Bank account not found.");
        }

        // Associer le compte bancaire
        invoice.bankAccount = bankAccount;
      } else {
        // Dissocier le compte bancaire
        invoice.bankAccount = null;
      }

      await invoice.save();

      return invoice;
    } catch (error) {
      console.error("Error associating bank account to invoice:", error);
      throw new Error("Unable to associate bank account to invoice.");
    }
  }
}
