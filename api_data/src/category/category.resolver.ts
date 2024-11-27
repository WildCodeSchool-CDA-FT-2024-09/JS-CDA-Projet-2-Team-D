import { Category } from "./category.entity";
import { Resolver, Query } from "type-graphql";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async categories() {
    return Category.find();
  }
}
