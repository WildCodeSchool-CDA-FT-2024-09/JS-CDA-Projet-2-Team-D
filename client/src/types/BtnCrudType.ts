export type BtnCrudType = {
  type: "add" | "edit" | "delete" | "save" | "cancel";
  disabled?: boolean;
  handleClick: () => void;
};
