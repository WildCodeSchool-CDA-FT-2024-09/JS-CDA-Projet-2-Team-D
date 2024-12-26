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
  validate?: (value: unknown) => undefined | string | Promise<unknown>;
  reset?: boolean; // Ajout d'un prop reset pour réinitialiser le champ
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
    <TextField
      name={name}
      fullWidth
      label={label}
      required={required}
      multiline={multiline}
      rows={rows}
      value={value} // Utilisation de l'état local pour contrôler la valeur
      onChange={(e) => {
        onChange?.(e); // Appeler la fonction onChange, si elle est fournie
      }}
    />
  );
};

export default FormTextField;
