import React, { useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

export interface Invoice {
  vat_id: number;
  price_without_vat: number;
  total: number;
}

interface FormSelectVatProps {
  name: string;
  label: string;
  options: { id: number; label: string; rate: number }[];
  value: string | undefined;
  error?: boolean;
  onChange: (event: SelectChangeEvent<string>) => void;
  priceWithoutVat: number;
  setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
}

export const FormSelectVat: React.FC<FormSelectVatProps> = ({
  name,
  label,
  options,
  value,
  error,
  onChange,
  priceWithoutVat,
  setInvoice,
}) => {
  useEffect(() => {
    if (value) {
      const selectedVatId = parseInt(value, 10);
      const selectedVat = options.find((option) => option.id === selectedVatId);

      if (selectedVat) {
        const vatRate = selectedVat.rate;
        const parsedPriceWithoutVat = priceWithoutVat || 0;
        const totalTTC =
          parsedPriceWithoutVat + (parsedPriceWithoutVat * vatRate) / 100;

        if (Number.isFinite(totalTTC)) {
          setInvoice((prevState) => ({
            ...prevState,
            vat_id: selectedVatId,
            total: totalTTC,
          }));
        } else {
          setInvoice((prevState) => ({
            ...prevState,
            vat_id: selectedVatId,
            total: 0,
          }));
        }
      }
    }
  }, [value, priceWithoutVat, options, setInvoice]);

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value || ""}
        onChange={(e) => {
          onChange(e);
        }}
        label={`Taux de TVA : ${options.find((option) => option.id.toString() === value)?.label || "Non sélectionné"}`}
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
  );
};

export default FormSelectVat;
