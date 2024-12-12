import { Subcategory } from "./subcategory.entity";
import { Category } from "../category/category.entity";
import { Resolver, Mutation, Query, Arg } from "type-graphql";

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

    await subcategory.save();
    return subcategory;
  }
}
