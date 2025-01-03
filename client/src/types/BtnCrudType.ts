export type BtnCrudType = {
  type: "add" | "edit" | "delete" | "disable" | "enable" | "save" | "cancel";
  disabled?: boolean;
  handleClick: () => void;
};
