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
  subValue?: number;
  property: string;
  handleSelect: (event: SelectChangeEvent<string | number>) => void;
  error?: string;
  required?: boolean;
}

const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  value,
  subValue,
  property,
  handleSelect,
}) => {
  const [getCommissions] = useGetCommissionsLazyQuery();
  const [getCategory] = useGetCategoriesLazyQuery();
  const [items, setItems] = useState<unknown[]>([]);

  useEffect(() => {
    const getItems = async () => {
      let result: unknown[] = [];
      if (name === "commission_id") {
        const { data } = await getCommissions();
        result = data?.getCommissions || [];
      }
      if (name === "category_id" || name === "subcategory_id") {
        const { data } = await getCategory();
        result = data?.getCategories;
      }
      setItems(result);
    };
    getItems();
  }, [name]);

  const getCreditDebitId = (categoryId: number): number => {
    const selectedCategory = items.find(
      (category) => category.id === categoryId,
    );
    return selectedCategory?.creditDebit?.id || 0;
  };

  const launchSelect = (
    event:
      | SelectChangeEvent<string | number>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (name === "category_id") {
      const credit_debit_id = getCreditDebitId(+event.target.value);
      handleSelect(event, credit_debit_id);
    } else {
      handleSelect(event);
    }
  };

  const getItemsToDisplay = () => {
    const subOptions = items.find((item) => item.id === subValue);
    return subOptions?.subcategories || [];
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        value={value.toString()}
        onChange={launchSelect}
        aria-label={`${label} sélectionné : ${items.find((item) => item.id.toString() === value.toString())?.name || "Non sélectionné"}`}
      >
        {name !== "subcategory_id" &&
          items.map((item) => (
            <MenuItem key={item.id} value={item.id.toString()}>
              {item[property]}
            </MenuItem>
          ))}
        {name === "subcategory_id" &&
          getItemsToDisplay().map((subOption) => (
            <MenuItem key={subOption.id} value={subOption.id.toString()}>
              {subOption.label}
            </MenuItem>
          ))}
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
