import { Category } from "./category.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { validate } from "class-validator";

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    return Category.find({
      relations: ["subcategories", "creditDebit"],
      order: {
        subcategories: {
          id: "ASC",
        },
      },
    });
  }

  // add a new category
  @Mutation(() => Category)
  async addCategory(
    @Arg("label") label: string,
    @Arg("creditDebitId") creditDebitId: number
  ): Promise<Category> {
    const creditDebit = await CreditDebit.findOneBy({ id: creditDebitId });
    if (!creditDebit) {
      throw new Error("Veuiller selectionner un type de crédit/débit valide");
    }
    if (label.trim() === "") {
      throw new Error("Veuillez entrer un libellé de catégorie !");
    }
    if (await Category.findOneBy({ label })) {
      throw new Error("Cette catégorie existe déjà !");
    }

    const category = new Category();
    category.label = label;
    category.creditDebit = creditDebit;

    const errors = await validate(category);
    if (errors.length > 0) {
      throw new Error(
        `Erreur dans la validation des données de la catégorie : ${errors}`
      );
    }

    await category.save();
    return category;
  }

  // update a category
  @Mutation(() => Category)
  async updateCategory(
    @Arg("id") id: number,
    @Arg("label") label: string,
    @Arg("creditDebitId") creditDebitId: number
  ): Promise<Category> {
    const category = await Category.findOne({
      where: { id },
      relations: ["creditDebit"],
    });

    if (!category) {
      throw new Error("Catégorie non trouvée !");
    }

    const currentCreditDebitId = category.creditDebit.id;

    // Vérifiez si aucun changement n'a été apporté
    if (
      label.trim() === category.label.trim() &&
      creditDebitId === currentCreditDebitId
    ) {
      throw new Error("Aucune modification n'a été apportée !");
    }

    // Récupérer le nouveau crédit/débit
    const creditDebit = await CreditDebit.findOneBy({ id: creditDebitId });
    if (!creditDebit) {
      throw new Error("Veuillez sélectionner un type de crédit/débit valide !");
    }

    // Mise à jour uniquement des champs modifiés
    if (label.trim() !== category.label.trim()) {
      if (label.trim() === "") {
        throw new Error("Veuillez entrer un libellé de catégorie !");
      }
      category.label = label.trim();
    }

    if (creditDebitId !== currentCreditDebitId) {
      category.creditDebit = creditDebit;
    }

    // Validations des données
    const errors = await validate(category);
    if (errors.length > 0) {
      throw new Error(
        `Erreur dans la validation des données de la catégorie : ${errors}`
      );
    }

    // Sauvegarder la catégorie modifiée
    await category.save();
    return category;
  }
}
