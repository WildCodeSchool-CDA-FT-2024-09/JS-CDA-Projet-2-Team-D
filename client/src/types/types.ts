import { RefObject } from "react";

export type RefMap = {
  [key: string]: RefObject<HTMLInputElement>;
};
