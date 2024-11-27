import { Field, InputType } from "type-graphql";
import { IsNotEmpty, IsString, Length } from "class-validator";

export type Bank = {
  id: number;
  name: string;
};

@InputType()
export class BankInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: "Le nom est obligatoire" })
  @Length(1, 30, { message: "Le nom doit avoir entre 1 et 30 caractères" })
  label: string;
}
