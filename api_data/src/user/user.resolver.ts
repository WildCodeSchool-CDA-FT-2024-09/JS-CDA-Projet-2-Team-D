import { Resolver, Query, Mutation, Arg, InputType, Field } from "type-graphql";
import {
  // validate,
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
} from "class-validator";
import argon2 from "argon2";
import { User } from "./user.entity";
import { Role } from "../role/role.entity";

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
  @Query(() => [User])
  async getUsers() {
    return await User.find();
  }

  @Mutation(() => User)
  async createNewUser(@Arg("data") data: CreateUserInput) {
    try {
      const user = new User();
      user.firstname = data.firstname;
      user.lastname = data.lastname;
      user.email = data.email;
      user.password = await argon2.hash(data.password);

      // const error = await validate(user);
      // if (error.length > 0)
      //   throw new Error(
      //     `Erreur dans la validation des données utilisateur : ${error}`
      //   );

      await user.save();

      // Attach roles
      data.roles.map(async (roleInput) => {
        const roleSelected = await Role.findOne({
          where: { id: roleInput.id },
        });
        if (roleSelected) {
          user.roles = [...(user.roles || []), roleSelected];
          // await user.save();
        }
      });
      console.info(user.roles);

      await user.save();

      return user;
    } catch (error) {
      console.error(error);
      throw new Error("Problème avec la création d'un nouvel utilisateur.");
    }
  }
}
