import { Resolver, Query } from "type-graphql";
import { User } from "./user.entity";

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async getUsers() {
    return await User.find();
  }
}
