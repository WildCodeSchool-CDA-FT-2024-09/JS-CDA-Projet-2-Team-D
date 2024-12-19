import { Field, ObjectType } from "type-graphql";

type Status = "success" | "error";

// This object enables us to give a feedback to the front,
// using message you can specifiy the error

@ObjectType()
export class DeleteResponseStatus {
  constructor(status: Status, message?: string) {
    this.success = status === "success" ? true : false;
    this.message = message;
  }

  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}

@ObjectType()
export class RestoreResponseStatus {
  constructor(status: Status, message?: string) {
    this.success = status === "success" ? true : false;
    this.message = message;
  }

  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;
}
