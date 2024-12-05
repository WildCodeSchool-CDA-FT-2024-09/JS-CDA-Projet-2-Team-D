import { Category } from "./category.entity";
import { CreditDebit } from "../creditDebit/creditDebit.entity";
import { Resolver, Query, Mutation, Arg } from "type-graphql";

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
      throw new Error("CreditDebit not found");
    }
    const category = new Category();
    category.label = label;
    category.creditDebit = creditDebit;
    await category.save();
    return category;
  }
}
