import { Category } from "./category.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Resolver, Query, Mutation, Arg, Authorized } from "type-graphql";
import { validate } from "class-validator";

@Resolver(Category)
export default class CategoryResolver {
  @Authorized(["1", "2", "3"])
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

  @Authorized(["2"])
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

    const existingCategory = await Category.findOneBy({
      label,
      creditDebit: { id: creditDebitId },
    });

    if (existingCategory) {
      throw new Error(
        "Cette catégorie existe déjà pour cette option de crédit/débit !"
      );
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

  @Authorized(["2"])
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

    if (
      label.trim() === category.label.trim() &&
      creditDebitId === currentCreditDebitId
    ) {
      throw new Error("Aucune modification n'a été apportée !");
    }

    const creditDebit = await CreditDebit.findOneBy({ id: creditDebitId });
    if (!creditDebit) {
      throw new Error("Veuillez sélectionner un type de crédit/débit valide !");
    }

    if (label.trim() !== category.label.trim()) {
      if (label.trim() === "") {
        throw new Error("Veuillez entrer un libellé de catégorie !");
      }
      category.label = label.trim();
    }

    if (creditDebitId !== currentCreditDebitId) {
      category.creditDebit = creditDebit;
    }

    const errors = await validate(category);
    if (errors.length > 0) {
      throw new Error(
        `Erreur dans la validation des données de la catégorie : ${errors}`
      );
    }

    await category.save();
    return category;
  }
}
