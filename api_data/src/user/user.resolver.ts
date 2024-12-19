import {
  Resolver,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
  Int,
  Ctx,
} from "type-graphql";
import {
  validate,
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
} from "class-validator";
import { AppDataSource } from "../db/data-source";
import {
  DeleteResponseStatus,
  RestoreResponseStatus,
} from "../utilities/responseStatus";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import argon2 from "argon2";
import { User } from "./user.entity";
import { Role } from "../role/role.entity";
import { Commission } from "../commission/commission.entity";
import { PaginatedUsers } from "./user.type";

dotenv.config();
const { AUTH_SECRET_KEY } = process.env;

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
class userIdInput {
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

  @Field({ nullable: true })
  deletedAt?: string;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => PaginatedUsers)
  async getUsers(
    @Arg("offset", () => Int, { defaultValue: 0 }) offset: number,
    @Arg("limit", () => Int, { defaultValue: 10 }) limit: number
  ): Promise<PaginatedUsers> {
    const [users, totalCount] = await User.findAndCount({
      withDeleted: true, // By default TypeORM excludes soft deleted records
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

  @Mutation(() => DeleteResponseStatus)
  async softDeleteUser(@Arg("data") data: userIdInput) {
    try {
      const user = await User.findOneBy({ id: data.id });

      if (!user) {
        return new DeleteResponseStatus(
          "error",
          `L'utilisateur n°${data.id} n'existe pas`
        );
      } else {
        await user.softRemove();
        return new DeleteResponseStatus("success");
      }
    } catch (error) {
      console.error(error);
      return new DeleteResponseStatus("error", "server error");
    }
  }

  @Mutation(() => RestoreResponseStatus)
  async restoreUser(@Arg("data") data: userIdInput) {
    try {
      // Using getRepository because Active Record does not support restore
      const userRepository = AppDataSource.getRepository(User);

      const user = await userRepository.findOne({
        where: { id: data.id },
        withDeleted: true,
      });

      if (!user) {
        return new RestoreResponseStatus(
          "error",
          `L'utilisateur n°${data.id} n'existe pas`
        );
      } else {
        await userRepository.restore(data.id);
        return new RestoreResponseStatus("success");
      }
    } catch (error) {
      console.error(error);
      return new RestoreResponseStatus("error", "server error");
    }
  }

  @Query(() => Boolean)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx()
    context: { res: { setHeader: (name: string, value: string) => void } }
  ) {
    try {
      const user = await User.findOneOrFail({
        where: { email: email },
      });

      if (!user) {
        return new DeleteResponseStatus(
          "error",
          `Problème avec l'utilisateur. Veuillez réessayer.`
        );
      } else {
        if (user.email === email) {
          try {
            if (await argon2.verify(user.password, password)) {
              const token = jwt.sign(
                {
                  id: user.id,
                  email: user.email,
                  firstname: user.firstname,
                  lastname: user.lastname,
                },
                AUTH_SECRET_KEY as string
              );
              context.res.setHeader(
                "Set-Cookie",
                `clubcompta_token=${token};httpOnly;secure;SameSite=Strict;expires=${new Date(
                  new Date().getTime() + 1000 * 60 * 60 * 48 // 2 days
                ).toUTCString()}`
              );

              return true;
            }
          } catch (error) {
            console.error(error);
            return new RestoreResponseStatus("error", "server error");
          }
        }
      }
    } catch (error) {
      console.error(error);
      return new RestoreResponseStatus("error", "server error");
    }

    return false;
  }
}
