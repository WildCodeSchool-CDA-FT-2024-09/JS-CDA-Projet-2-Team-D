import { InputType, Field } from "type-graphql";
import { IsString, IsNotEmpty, Length, IsDate } from "class-validator";

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

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  end_date: Date;
}
