import React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { Field, FieldProps } from "formik";

interface FormSelectVatProps {
  name: string;
  label: string;
  options: { id: number; label: string }[];
  value: string | undefined;
  error?: boolean;
  onChange: (event: SelectChangeEvent<string>) => void;
}

const FormSelectVat: React.FC<FormSelectVatProps> = ({
  name,
  label,
  options,
  value,
  error,
  onChange,
}) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <FormControl fullWidth error={error}>
          <InputLabel>{label}</InputLabel>
          <Select
            {...field}
            value={value || ""}
            onChange={(e) => {
              field.onChange(e); // Appel à onChange de Formik
              onChange(e); // Appel à la fonction onChange passée en prop
            }}
            aria-label={`Taux TVA sélectionné : ${options.find((option) => option.id.toString() === value)?.label || "Non sélectionné"}`}
          >
            {options.map((vat) => (
              <MenuItem key={vat.id} value={vat.id.toString()}>
                {vat.label}
              </MenuItem>
            ))}
          </Select>
          {error && (
            <Typography color="error" variant="body2">
              Ce champ est obligatoire.
            </Typography>
          )}
        </FormControl>
      )}
    </Field>
  );
};

export default FormSelectVat;
