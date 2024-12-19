import { Subcategory } from "./subcategory.entity";
import { Category } from "../category/category.entity";
import { Resolver, Mutation, Query, Arg } from "type-graphql";
import { validate } from "class-validator";

@Resolver(Subcategory)
export default class SubcategoryResolver {
  @Query(() => [Subcategory])
  async getSubcategories() {
    return Subcategory.find();
  }
  @Mutation(() => Subcategory)
  async addSubcategory(
    @Arg("label") label: string,
    @Arg("code") code: string,
    @Arg("categoryId") categoryId: number
  ) {
    const category = await Category.findOneBy({ id: categoryId });
    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`);
    }

    const subcategory = new Subcategory();
    subcategory.label = label;
    subcategory.code = code;
    subcategory.category = category;

    const existingSubcategory = await Subcategory.findOneBy({
      label: subcategory.label,
    });
    if (existingSubcategory) {
      throw new Error(`Subcategory with label ${label} already exists`);
    }

    await subcategory.save();
    return subcategory;
  }

  @Mutation(() => Subcategory)
  async updateSubcategory(
    @Arg("id") id: number,
    @Arg("label") label: string,
    @Arg("code") code: string,
    @Arg("categoryId") categoryId: number
  ): Promise<Subcategory> {
    const subcategory = await Subcategory.findOneBy({ id });
    if (!subcategory) {
      throw new Error(`Subcategory with id ${id} not found`);
    }

    const category = await Category.findOneBy({ id: categoryId });
    if (!category) {
      throw new Error(`Category with id ${categoryId} not found`);
    }

    // vérifier si aucun changement n'a été apporté
    if (
      subcategory.label.trim() === label.trim() &&
      subcategory.code.trim() === code.trim() &&
      subcategory.category.id === categoryId
    ) {
      throw new Error("Aucune modification n'a été apportée");
    }

    // Mise à jour uniquement des champs modifiés
    if (subcategory.label.trim() !== label.trim()) {
      if (label.trim() === "") {
        throw new Error("Veuillez entrer un libellé de sous-catégorie");
      }
      subcategory.label = label.trim();
    }

    if (subcategory.code.trim() !== code.trim()) {
      if (code.trim() === "") {
        throw new Error("Veuillez entrer un code de sous-catégorie");
      }
      subcategory.code = code.trim();
    }

    // Validation des données
    const errors = await validate(subcategory);
    if (errors.length > 0) {
      throw new Error(
        `Erreur dans la validation des données de la sous-catégorie : ${errors}`
      );
    }

    // Mise à jour de la catégorie parente
    subcategory.category = category;

    await subcategory.save();
    return subcategory;
  }
}
