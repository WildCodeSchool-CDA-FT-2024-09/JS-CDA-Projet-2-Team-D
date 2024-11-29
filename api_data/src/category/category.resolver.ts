import { Category } from "./category.entity";
import { Resolver, Query } from "type-graphql";

@Resolver(Category)
export default class CategoryResolver {
  @Query(() => [Category])
  async getCategories() {
    return Category.find();
  }
}
