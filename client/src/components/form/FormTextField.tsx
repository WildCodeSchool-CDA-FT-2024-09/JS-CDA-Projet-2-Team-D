import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface FormTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  validate?: (value: unknown) => undefined | string | Promise<unknown>;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  required = false,
  multiline = false,
  rows,
  onChange,
}) => {
  return (
    <TextField
      name={name}
      fullWidth
      label={label}
      required={required}
      multiline={multiline}
      rows={rows}
      onChange={(e) => {
        onChange?.(e);
      }}
    />
  );
};

export default FormTextField;
