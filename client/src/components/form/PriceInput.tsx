import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { TextField } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface PriceInputProps {
  value: number;
  onChange: (
    event:
      | SelectChangeEvent<string | number>
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
  ) => void;
  size?: number;
  required?: boolean;
}

const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChange,
  size = 12,
  required = true,
}) => {
  const [displayValue, setDisplayValue] = useState<string>(value.toString());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Only allow numbers, a period or a comma
    if (!/^[0-9,.\b]+$/.test(inputValue) && inputValue !== "") {
      return;
    }

    setDisplayValue(inputValue);

    // Converts the value for the parent state
    const normalizedValue = inputValue.replace(",", ".");
    const numberValue = parseFloat(normalizedValue);

    if (!isNaN(numberValue)) {
      const syntheticEvent = {
        target: {
          name: "price_without_vat",
          value: numberValue,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onChange(syntheticEvent);
    }
  };

  React.useEffect(() => {
    setDisplayValue(value.toString());
  }, [value]);

  return (
    <Grid size={size}>
      <TextField
        label="Prix HT"
        type="text"
        fullWidth
        required={required}
        name="price_without_vat"
        value={displayValue}
        onChange={handleChange}
        InputProps={{
          endAdornment: "€",
        }}
      />
    </Grid>
  );
};

export default PriceInput;
