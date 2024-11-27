import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Bank } from "./bank.entity";
import { BankInput } from "./bank.type";
import { validate } from "class-validator";

@Resolver(Bank)
export default class BankResolver {
  // Methode GET pour toutes les banques
  @Query(() => [Bank])
  async getfullbanks() {
    const banks = await Bank.find({});
    return banks;
  }

  // Methode POST pour créer une nouvelle banque
  @Mutation(() => Bank)
  async createNewBank(@Arg("data") newBank: BankInput) {
    // Validation des données
    const errors = await validate(newBank);
    if (errors.length > 0) {
      throw new Error(
        `Erreur de validation: ${errors
          .map((err) => Object.values(err.constraints || {}).join(", "))
          .join("; ")}`
      );
    }

    // Création et sauvegarde de la banque
    const bank = new Bank();
    bank.label = newBank.label;

    await bank.save();
    //console.log("Banque créée:", bank);

    return bank;
  }
}
