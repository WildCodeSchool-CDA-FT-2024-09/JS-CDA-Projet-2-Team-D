import { Subcategory } from "./subcategory.entity";
import { Resolver, Query } from "type-graphql";

@Resolver(Subcategory)
export default class SubcategoryResolver {
  @Query(() => [Subcategory])
  async subcategories() {
    return Subcategory.find();
  }
}
