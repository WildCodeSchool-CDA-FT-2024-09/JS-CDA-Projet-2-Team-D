import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./user.entity";

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  totalCount: number;
}
