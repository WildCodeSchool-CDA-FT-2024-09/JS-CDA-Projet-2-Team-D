import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";

interface FormSelectProps {
  name: string;
  label: string;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  options: { id: number; name?: string; label?: string }[];
  error?: string;
  required?: boolean;
  subOptions?: { id: number; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  value,
  onChange,
  options,
  error,
  subOptions,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        error={!!error}
        aria-label={`${label} sélectionné : ${options.find((option) => option.id.toString() === value)?.name || "Non sélectionné"}`}
      >
        {options.map((option) => (
          <MenuItem key={option.id} value={option.id.toString()}>
            {option.label || option.name}
          </MenuItem>
        ))}
        {subOptions &&
          subOptions.map((subOption) => (
            <MenuItem key={subOption.id} value={subOption.id.toString()}>
              {subOption.label}
            </MenuItem>
          ))}
      </Select>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </FormControl>
  );
};

export default FormSelect;
