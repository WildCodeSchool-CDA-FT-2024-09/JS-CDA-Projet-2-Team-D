import { RefObject } from "react";

export type RefMap = {
  [key: string]: RefObject<HTMLInputElement>;
};

export type BooleanMap = {
  [key: string]: boolean;
};
