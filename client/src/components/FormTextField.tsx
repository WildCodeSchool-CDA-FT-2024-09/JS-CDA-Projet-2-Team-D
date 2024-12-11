import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { Field, FieldProps } from "formik";

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
  validate,
  ...rest
}) => {
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps) => (
        <TextField
          {...field}
          {...rest}
          fullWidth
          label={label}
          required={required}
          multiline={multiline}
          rows={rows}
          error={meta.touched && !!meta.error}
          helperText={meta.touched && meta.error}
          onChange={(e) => {
            field.onChange(e);
            onChange?.(e);
          }}
        />
      )}
    </Field>
  );
};

export default FormTextField;
