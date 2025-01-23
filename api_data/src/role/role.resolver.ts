import { Resolver, Query, Authorized } from "type-graphql";
import { Role } from "./role.entity";

@Resolver(Role)
export default class RoleResolver {
  @Authorized(["1", "2", "3"])
  @Query(() => [Role])
  async getRoles() {
    return await Role.find();
  }
}
