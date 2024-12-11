import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
} from "type-graphql";
import {
  validate,
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
} from "class-validator";
import argon2 from "argon2";
import { User } from "./user.entity";
import { Role } from "../role/role.entity";
import { PaginatedUsers } from "./user.type";

@InputType()
class RolesInput {
  @Field()
  id: number;
}

@InputType()
class CreateUserInput {
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

  @Field()
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  passwordConfirm: string;

  @Field(() => [RolesInput])
  roles: RolesInput[];
}

@Resolver(User)
export default class UserResolver {
  @Query(() => PaginatedUsers)
  async getUsers(
    @Arg("offset", () => Int, { defaultValue: 0 }) offset: number,
    @Arg("limit", () => Int, { defaultValue: 10 }) limit: number
  ): Promise<PaginatedUsers> {
    const [users, totalCount] = await User.findAndCount({
      relations: ["roles"],
      skip: offset,
      take: limit,
    });

    return { users, totalCount };
  }

  @Mutation(() => User)
  async createNewUser(@Arg("data") data: CreateUserInput) {
    try {
      const user = new User();
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;
      user.password = await argon2.hash(data.password);

      const error = await validate(user);
      if (error.length > 0)
        throw new Error(
          `Erreur dans la validation des données utilisateur : ${error}`
        );

      await user.save();

      // Attach roles
      data.roles.map(async (roleInput) => {
        const roleSelected = await Role.findOneOrFail({
          where: { id: roleInput.id },
        });
        if (roleSelected) {
          user.roles = [...(user.roles || []), roleSelected];
          await user.save();
        }
      });

      // Return user with associated roles
      return User.findOneOrFail({
        where: { id: user.id },
        relations: ["roles"],
      });
    } catch (error) {
      console.error(error);
      throw new Error("Problème avec la création d'un nouvel utilisateur.");
    }
  }
}
