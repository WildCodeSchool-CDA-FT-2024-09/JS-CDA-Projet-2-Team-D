import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface FormTextFieldProps extends Omit<TextFieldProps, "name"> {
  name: string;
  label?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
  value: string;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  error?: boolean;
  helperText?: string;
  validate?: (value: unknown) => undefined | string | Promise<unknown>;
  reset?: boolean;
}

const FormTextField: React.FC<FormTextFieldProps> = ({
  name,
  label,
  required = false,
  multiline = false,
  rows,
  value,
  onChange,
}) => {
  return (
    <>
      <TextField
        name={name}
        fullWidth
        label={label}
        required={required}
        multiline={multiline}
        rows={rows}
        value={value}
        onChange={(e) => {
          onChange?.(e);
        }}
      />
    </>
  );
};

export default FormTextField;
