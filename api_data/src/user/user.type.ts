import { ObjectType, InputType, Field, Int } from "type-graphql";
import { IsString, IsNotEmpty, Length, IsEmail } from "class-validator";
import { User } from "./user.entity";

@InputType()
export class RolesInput {
  @Field()
  id: number;
}

@InputType()
export class CommissionsInput {
  @Field()
  id: number;
}

@InputType()
export class UserIdInput {
  @Field()
  id: number;
}

@InputType()
export class UserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  firstname: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  lastname: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 150)
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;

  @Field(() => [RolesInput])
  roles: RolesInput[];

  @Field(() => [CommissionsInput])
  commissions: CommissionsInput[];

  @Field({ nullable: true })
  deletedAt?: string;
}

@ObjectType()
export class PaginatedUsers {
  @Field(() => [User])
  users: User[];

  @Field(() => Int)
  totalCount: number;
}

@ObjectType()
export class UserRoleInput {
  @Field()
  id: number;
}

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;

  @Field()
  id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field(() => [UserRoleInput])
  roles: UserRoleInput[];
}

@ObjectType()
export class AuthenticatedUserResponse {
  @Field()
  id: number;

  @Field()
  firstname: string;

  @Field()
  lastname: string;

  @Field()
  email: string;

  @Field(() => [UserRoleInput])
  roles: UserRoleInput[];
}
