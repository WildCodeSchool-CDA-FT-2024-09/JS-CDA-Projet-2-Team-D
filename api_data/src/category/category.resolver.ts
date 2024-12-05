import { Category } from "./category.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { validate } from "class-validator";

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    return Category.find();
  }

  // add a new category
  @Mutation(() => Category)
  async addCategory(
    @Arg("label") label: string,
    @Arg("creditDebitId") creditDebitId: number
  ): Promise<Category> {
    const creditDebit = await CreditDebit.findOneBy({ id: creditDebitId });
    if (!creditDebit) {
      // console.log("error");
      throw new Error("Veuiller selectionner un type de crédit/débit valide");
    }
    if (label.trim() === "") {
      throw new Error("Veuillez entrer un libellé de catégorie !");
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
}
