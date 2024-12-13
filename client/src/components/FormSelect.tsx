import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  useGetCommissionsLazyQuery,
  useGetCategoriesLazyQuery,
  GetCommissionsQuery,
  GetCategoriesQuery,
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
  handleSelect,
}) => {
  const [getCommissions] = useGetCommissionsLazyQuery();
  const [getCategory] = useGetCategoriesLazyQuery();
  const [items, setItems] = useState<
    GetCommissionsQuery | GetCategoriesQuery
  >();

  useEffect(() => {
    const getItems = async () => {
      let result: GetCommissionsQuery | GetCategoriesQuery | null = null;
      if (name === "commission_id") {
        const { data } = await getCommissions();
        result = data as GetCommissionsQuery;
      }
      if (name === "category_id" || name === "subcategory_id") {
        const { data } = await getCategory();
        result = data as GetCategoriesQuery;
      }
      if (result) {
        setItems(result);
      }
    };
    getItems();
  }, [name, getCategory, getCommissions]);

  const getCreditDebitId = (categoryId: number): number => {
    if (items && "getCategories" in items) {
      const selectedCategory = items.getCategories.find(
        (category) => category.id === categoryId,
      );
      return selectedCategory?.creditDebit?.id || 0;
    }
    return 0;
  };

  const launchSelect = (event: SelectChangeEvent<string | number>) => {
    if (name === "category_id") {
      const credit_debit_id = getCreditDebitId(+event.target.value);
      handleSelect(event, credit_debit_id);
    } else {
      handleSelect(event);
    }
  };

  const getItemsToDisplay = () => {
    const subOptions =
      items && "getCategories" in items
        ? items.getCategories.find((item) => item.id === subValue)
        : undefined;
    return subOptions?.subcategories || [];
  };

  if (!items) return <p>Loading</p>;

  if (items)
    return (
      <FormControl fullWidth>
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          label={label}
          value={value.toString()}
          onChange={launchSelect}
          aria-label={`${label} sélectionné : $ ${value.toString() || "Non sélectionné"}`}
        >
          {name === "commission_id" &&
            "getCommissions" in items &&
            items.getCommissions.map((item) => (
              <MenuItem key={item.id} value={item.id.toString()}>
                {item.name}
              </MenuItem>
            ))}

          {name === "category_id" &&
            "getCategories" in items &&
            items.getCategories.map((item) => (
              <MenuItem key={item.id} value={item.id.toString()}>
                {item.label}
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
