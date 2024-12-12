import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  // Typography,
  SelectChangeEvent,
} from "@mui/material";
import {
  useGetCommissionsLazyQuery,
  useGetCategoriesLazyQuery,
} from "../types/graphql-types";

interface FormSelectProps {
  name: string;
  label: string;
  value: string | number;
  property: string;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  error?: string;
  required?: boolean;
  subOptions?: { id: number; label: string }[];
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  value,
  property,
  onChange,
}) => {
  const [getCommissions] = useGetCommissionsLazyQuery();
  const [getCategory] = useGetCategoriesLazyQuery();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getItems = async () => {
      let result = [];
      if (name === "commission_id") {
        const { data } = await getCommissions();
        result = data?.getCommissions;
      }
      if (name === "category_id") {
        const { data } = await getCategory();
        result = data?.getCategories;
      }
      setItems(result);
    };
    getItems();
  }, [name]);

  const getCreditDebitId = (categoryId: number): number => {
    const selectedCategory = items.find(
      (category) => category.id === +categoryId,
    );
    return selectedCategory?.creditDebit?.id || 0;
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (name === "category_id") {
      onChange(event, getCreditDebitId(event.target.value));
    } else {
      onChange(event);
    }
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        value={value.toString()}
        onChange={handleSelect}
        aria-label={`${label} sélectionné : ${items.find((item) => item.id.toString() === value.toString())?.name || "Non sélectionné"}`}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id.toString()}>
            {item[property]}
          </MenuItem>
        ))}
        {/* {subOptions &&
            subOptions.map((subOption) => (
              <MenuItem key={subOption.id} value={subOption.id.toString()}>
                {subOption.label}
              </MenuItem>
            ))} */}
      </Select>
      {/* {typeof error === "string" && error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )} */}
    </FormControl>
  );
};

export default FormSelect;
