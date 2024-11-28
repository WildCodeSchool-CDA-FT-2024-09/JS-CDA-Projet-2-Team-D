import { Resolver, Query } from "type-graphql";
import { Status } from "./status.entity";

@Resolver(Status)
export default class StatusResolver {
  @Query(() => [Status])
  async getStatuss() {
    return await Status.find();
  }
}
