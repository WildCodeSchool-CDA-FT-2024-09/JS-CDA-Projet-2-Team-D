import { Resolver, Query } from "type-graphql";
import { Role } from "./role.entity";

@Resolver(Role)
export default class RoleResolver {
  @Query(() => [Role])
  async getRoles() {
    return await Role.find();
  }
}
