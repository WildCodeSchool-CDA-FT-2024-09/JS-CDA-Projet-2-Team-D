import { Resolver, Query, Authorized } from "type-graphql";
import { Status } from "./status.entity";

@Resolver(Status)
export default class StatusResolver {
  @Authorized(["1", "2", "3"])
  @Query(() => [Status])
  async getStatus() {
    return await Status.find();
  }
}
