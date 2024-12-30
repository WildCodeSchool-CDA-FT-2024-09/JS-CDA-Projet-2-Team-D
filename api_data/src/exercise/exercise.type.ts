import { InputType, Field } from "type-graphql";
import { IsString, IsNotEmpty, Length } from "class-validator";

export type Exercise = {
  id: number;
  label: string;
  start_date: Date;
  end_date: Date;
};

@InputType()
export class ExerciseInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  label: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  start_date: Date;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @Length(1, 50)
  end_date: Date;
}
