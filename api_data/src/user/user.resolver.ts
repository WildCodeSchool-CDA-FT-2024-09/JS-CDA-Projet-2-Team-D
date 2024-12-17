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
import { Commission } from "../commission/commission.entity";
import { PaginatedUsers } from "./user.type";

@InputType()
class RolesInput {
  @Field()
  id: number;
}

@InputType()
class CommissionsInput {
  @Field()
  id: number;
}

@InputType()
class UserInput {
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

  @Field(() => [CommissionsInput])
  commissions: CommissionsInput[];
}

@Resolver(User)
export default class UserResolver {
  @Query(() => PaginatedUsers)
  async getUsers(
    @Arg("offset", () => Int, { defaultValue: 0 }) offset: number,
    @Arg("limit", () => Int, { defaultValue: 10 }) limit: number
  ): Promise<PaginatedUsers> {
    const [users, totalCount] = await User.findAndCount({
      relations: ["roles", "commissions"],
      skip: offset,
      take: limit,
      order: {
        id: "DESC",
        lastname: "ASC",
      },
    });

    return { users, totalCount };
  }

  @Query(() => User)
  async getUserById(@Arg("userId") userId: number) {
    const user = await User.findOneOrFail({
      where: { id: userId },
      relations: ["roles", "commissions"],
    });

    if (!user) {
      throw new Error("L'utilisateur n'existe pas");
    }

    return user;
  }

  @Mutation(() => User)
  async createNewUser(@Arg("data") data: UserInput) {
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

      // Attach roles
      const roles = await Role.find();
      user.roles = roles.filter((role) =>
        data.roles.some((el) => el.id === role.id)
      );

      // Attach commissions
      const commissions = await Commission.find();
      user.commissions = commissions.filter((commission) =>
        data.commissions.some((el) => el.id === commission.id)
      );

      const newUser = await user.save();

      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error("Problème avec la création d'un nouvel utilisateur.");
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("userId") userId: number,
    @Arg("data") data: UserInput
  ) {
    try {
      const user = await User.findOneOrFail({
        where: { id: userId },
        relations: ["roles", "commissions"],
      });

      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;

      // Update password only if it is not empty in the request
      if (data.password) {
        user.password = await argon2.hash(data.password);
      }

      const error = await validate(user);

      if (error.length > 0)
        throw new Error(
          `Erreur dans la validation des données utilisateur : ${error}`
        );

      // Attach roles
      const roles = await Role.find();
      user.roles = roles.filter((role) =>
        data.roles.some((el) => el.id === role.id)
      );

      // Attach commissions
      const commissions = await Commission.find();
      user.commissions = commissions.filter((commission) =>
        data.commissions.some((el) => el.id === commission.id)
      );

      const newUser = await user.save();

      return newUser;
    } catch (error) {
      console.error(error);
      throw new Error("Problème avec la création d'un nouvel utilisateur.");
    }
  }
}
