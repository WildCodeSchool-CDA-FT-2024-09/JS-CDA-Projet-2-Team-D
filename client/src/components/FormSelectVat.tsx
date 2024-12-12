import React, { useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
// import { Field, FieldProps } from "formik";

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
    // Calcul de la TVA dès qu'une nouvelle option est sélectionnée
    if (value) {
      const selectedVatId = parseInt(value, 10); // On récupère l'id de la TVA
      const selectedVat = options.find((option) => option.id === selectedVatId);

      if (selectedVat) {
        const vatRate = selectedVat.rate;
        const totalTTC = priceWithoutVat + (priceWithoutVat * vatRate) / 100;

        // Vérifier si totalTTC est un nombre valide avant de l'utiliser
        if (Number.isFinite(totalTTC)) {
          setInvoice((prevState) => ({
            ...prevState,
            vat_id: selectedVatId,
            total: totalTTC,
          }));
        } else {
          // Si totalTTC n'est pas un nombre valide, définir un total par défaut
          setInvoice((prevState) => ({
            ...prevState,
            vat_id: selectedVatId,
            total: 0, // ou un autre montant par défaut
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
