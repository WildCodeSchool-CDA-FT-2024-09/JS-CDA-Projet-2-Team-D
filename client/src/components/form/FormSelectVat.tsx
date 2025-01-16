import React, { useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { calculateAmountWithVAT } from "../../utils/vatCalculator";

export interface Invoice {
  vat_id: number;
  price_without_vat: number;
  amount_with_vat: number;
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
        const totalTTC = calculateAmountWithVAT(
          priceWithoutVat || 0,
          selectedVat.rate,
        );

        setInvoice((prevState) => ({
          ...prevState,
          vat_id: selectedVatId,
          amount_with_vat: totalTTC,
        }));
      }
    }
  }, [value, priceWithoutVat, options, setInvoice]);

  const selectedLabel =
    options.find((option) => option.id.toString() === value)?.label ||
    "Non sélectionné";

  return (
    <FormControl fullWidth error={error}>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        value={value || ""}
        onChange={(e) => {
          onChange(e);
        }}
        label={`Taux de TVA : ${selectedLabel}`}
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
