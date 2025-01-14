import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Int,
  Ctx,
  Authorized,
} from "type-graphql";
import { MoreThan } from "typeorm";
import { validate } from "class-validator";
import { AppDataSource } from "../db/data-source";
import {
  DeleteResponseStatus,
  RestoreResponseStatus,
} from "../utilities/responseStatus";
import { IncomingMessage, ServerResponse } from "http";
import * as jwt from "jsonwebtoken";
import crypto from "crypto";
import * as dotenv from "dotenv";
import argon2 from "argon2";
import { generatePassword } from "../utilities/generatePassword";
import {
  sendPasswordByEmail,
  sendResetPasswordEmail,
} from "../utilities/emailUtils";
import { User } from "./user.entity";
import { Role } from "../role/role.entity";
import { Commission } from "../commission/commission.entity";
import {
  PaginatedUsers,
  UserInput,
  UserIdInput,
  LoginResponse,
  AuthenticatedUserResponse,
} from "./user.type";

dotenv.config();
const { AUTH_SECRET_KEY } = process.env;

interface UserContext {
  req: IncomingMessage;
  res: ServerResponse;
  loggedInUser?: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    roles: number[];
    iat: number;
    exp: number;
  };
  token: string;
}

@Resolver(User)
export default class UserResolver {
  @Authorized(["1"])
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

  @Authorized(["1", "2", "3"])
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

  @Authorized(["1"])
  @Mutation(() => User)
  async createNewUser(
    @Arg("data") data: UserInput,
    @Ctx() context: UserContext
  ) {
    try {
      const pwd = generatePassword(12);

      const user = new User();
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;
      user.password = await argon2.hash(pwd);

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

      const token = context.token;

      const emailSuccess = await sendPasswordByEmail(
        token,
        user.email,
        pwd,
        user.firstname,
        user.lastname
      );

      if (!emailSuccess) {
        throw new Error("Problème avec l'envoi de l'email");
      }

      return newUser;
    } catch (error) {
      throw new Error(
        `Problème avec la création d'un nouvel utilisateur : ${error}`
      );
    }
  }

  @Authorized(["1"])
  @Mutation(() => User)
  async updateUser(
    @Arg("userId") userId: number,
    @Arg("data") data: UserInput,
    @Ctx() context: UserContext
  ) {
    try {
      const user = await User.findOneOrFail({
        where: { id: userId },
        relations: ["roles", "commissions"],
      });

      const pwd = generatePassword(12);

      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;
      user.password = await argon2.hash(pwd);

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

      const updatedUser = await user.save();

      const token = context.token;

      const emailSuccess = await sendPasswordByEmail(
        token,
        user.email,
        pwd,
        user.firstname,
        user.lastname
      );

      if (!emailSuccess) {
        throw new Error("Problème avec l'envoi de l'email");
      }

      return updatedUser;
    } catch (error) {
      throw new Error(
        `Problème avec la mise à jour de l'utilisateur : ${error}`
      );
    }
  }

  @Authorized(["1"])
  @Mutation(() => DeleteResponseStatus)
  async softDeleteUser(@Arg("data") data: UserIdInput) {
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

  @Authorized(["1"])
  @Mutation(() => RestoreResponseStatus)
  async restoreUser(@Arg("data") data: UserIdInput) {
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

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() context: UserContext
  ) {
    try {
      const user = await User.findOneOrFail({
        where: { email: email },
        relations: ["roles"],
      });

      if (!user) {
        return new DeleteResponseStatus(
          "error",
          `Problème avec l'utilisateur. Veuillez réessayer.`
        );
      } else {
        try {
          if (await argon2.verify(user.password, password)) {
            const token = jwt.sign(
              {
                id: user.id,
                email: user.email,
                firstname: user.firstname,
                lastname: user.lastname,
                roles: user.roles.map((role) => ({ id: role.id })),
              },
              AUTH_SECRET_KEY as string,
              {
                expiresIn: "48h",
              }
            );
            context.res.setHeader(
              "Set-Cookie",
              `clubcompta_token=${token};httpOnly;secure;SameSite=Strict;expires=${new Date(
                new Date().getTime() + 1000 * 60 * 60 * 48 // 2 days
              ).toUTCString()}`
            );

            return {
              //SECU: tokenInMemory different from the cookie
              token: token,
              id: user.id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
              roles: user.roles.map((role) => ({ id: role.id })),
            };
          }
        } catch (error) {
          console.error(error);
          return new RestoreResponseStatus("error", "server error");
        }
      }
    } catch (error) {
      console.error(error);
      return new RestoreResponseStatus("error", "server error");
    }

    throw new DeleteResponseStatus(
      "error",
      "Problème avec vos  identifiants. Veuillez réessayer."
    );
  }

  @Query(() => AuthenticatedUserResponse)
  async getAuthenticatedUser(
    @Ctx()
    context: UserContext
  ) {
    const user = context.loggedInUser;

    if (user?.email && user?.roles) {
      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        roles: user.roles,
      };
    } else {
      throw new DeleteResponseStatus(
        "error",
        "Utilisateur non authentifié (token manquant ou non valide)"
      );
    }
  }

  @Mutation(() => String)
  async logout(@Ctx() context: UserContext): Promise<string> {
    const user = context.loggedInUser;
    if (user?.email && user?.roles) {
      const { res } = context;
      res.setHeader(
        "Set-Cookie",
        `clubcompta_token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`
      );
      return "Vous avez bien été déconnecté";
    } else {
      throw new DeleteResponseStatus(
        "error",
        "Utilisateur non authentifié (token manquant ou non valide)"
      );
    }
  }

  @Mutation(() => Boolean)
  async requestPasswordReset(@Arg("email") email: string) {
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      // Return true even if user doesn't exist for security
      return true;
    } else {
      // Generate reset token (encoded to be passed as a querystring)
      const resetToken = crypto.randomBytes(32).toString("base64");
      const encodedResetToken = encodeURIComponent(resetToken); // Encoded to be passed as a query string
      const resetTokenExpiry = new Date(Date.now() + 4 * 60 * 60 * 1000); // 4 hours

      // Save to the token + expiry to the database
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpiry = resetTokenExpiry;

      await user.save();

      // Send email with link
      const emailSuccess = await sendResetPasswordEmail(
        user.email,
        `http://localhost:7100/reset-password?token=${encodedResetToken}`
      );

      if (!emailSuccess) {
        throw new Error("Problème avec l'envoi de l'email");
      }
    }

    return true;
  }

  @Mutation(() => Boolean)
  async resetPassword(
    @Arg("token") token: string,
    @Arg("newPassword") newPassword: string
  ) {
    try {
      // Decode the token to handle special characters like '+'
      const decodedToken = decodeURIComponent(token);

      const user = await User.findOne({
        where: {
          resetPasswordToken: decodedToken,
          resetPasswordExpiry: MoreThan(new Date()),
        },
      });

      if (!user) {
        throw new Error("Le jeton a expiré ou n'est plus valide.");
      }

      // Regenerate the new password hash with argon2
      user.password = await argon2.hash(newPassword);
      (user.resetPasswordToken as string | null) = null;
      (user.resetPasswordExpiry as Date | null) = null;

      await user.save();
    } catch (error) {
      console.error(error);
      return new RestoreResponseStatus("error", "server error");
    }

    return true;
  }
}
