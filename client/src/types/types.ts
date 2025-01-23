import { RefObject } from "react";

export type RefMap = {
  [key: string]: RefObject<HTMLInputElement>;
};

export type BooleanMap = {
  [key: string]: boolean;
};

// used to control the snackbar globally
export type Notification = {
  open: boolean;
  message: string;
  severity: "success" | "info" | "warning" | "error";
};
