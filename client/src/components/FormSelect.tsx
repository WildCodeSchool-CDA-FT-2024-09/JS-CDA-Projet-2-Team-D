import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  SelectChangeEvent,
} from "@mui/material";
import { useGetCommissionsQuery } from "../types/graphql-types";

interface FormSelectProps {
  name: string;
  label: string;
  value: string | number;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  error?: string;
  required?: boolean;
  subOptions?: { id: number; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  subOptions,
}) => {
  const { data, loading, error: loadingError } = useGetCommissionsQuery();

  if (loading) return <p>Loading</p>;
  if (loadingError) return <p>error</p>;

  if (data)
    return (
      <FormControl fullWidth error={typeof error === "string" && !!error}>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          label={label}
          value={value.toString()}
          onChange={onChange}
          error={typeof error === "string" && !!error}
          aria-label={`${label} sélectionné : ${data.getCommissions.find((d) => d.id.toString() === value.toString())?.name || "Non sélectionné"}`}
        >
          {data.getCommissions.map((d) => (
            <MenuItem key={d.id} value={d.id.toString()}>
              {d.name}
            </MenuItem>
          ))}
          {subOptions &&
            subOptions.map((subOption) => (
              <MenuItem key={subOption.id} value={subOption.id.toString()}>
                {subOption.label}
              </MenuItem>
            ))}
        </Select>
        {typeof error === "string" && error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </FormControl>
    );
};

export default FormSelect;
