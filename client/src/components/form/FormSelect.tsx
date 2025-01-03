import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import {
  useGetCategoriesLazyQuery,
  GetCategoriesQuery,
  useGetUserByIdLazyQuery,
  GetUserByIdQuery,
} from "../../types/graphql-types";
import { useUser } from "../../hooks/useUser";

interface FormSelectProps {
  name: string;
  label: string;
  value: string | number;
  subValue?: number | null;
  property: string;
  handleSelect: (
    event: SelectChangeEvent<string | number>,
    creditDebitId?: number,
  ) => void;
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
  const { user } = useUser();
  const [getUserById] = useGetUserByIdLazyQuery();
  const [getCategory] = useGetCategoriesLazyQuery();
  const [items, setItems] = useState<
    GetUserByIdQuery["getUserById"]["commissions"] | GetCategoriesQuery
  >();

  useEffect(() => {
    const getItems = async () => {
      try {
        if (name === "commission_id") {
          if (!user?.id) {
            console.error(
              "Impossible de récupérer les commissions sans utilisateur connecté.",
            );
            return;
          }
          const { data } = await getUserById({
            variables: { userId: user.id },
          });
          if (data && data.getUserById) {
            setItems(data.getUserById.commissions);
          }
        } else if (name === "category_id" || name === "subcategory_id") {
          const { data } = await getCategory();
          if (data) {
            setItems(data);
          }
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données :", err);
      }
    };

    getItems();
  }, [name, user, getUserById, getCategory]); // Dépend de `user`

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

  if (!items) return <p>Loading...</p>;

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        name={name}
        label={label}
        value={value.toString() ?? ""}
        onChange={launchSelect}
        aria-label={`${label} sélectionné : ${value.toString() || "Non sélectionné"}`}
      >
        {name === "commission_id" &&
          Array.isArray(items) &&
          items.map((item) => (
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
          (() => {
            const subcategories = getItemsToDisplay();
            if (subcategories.length === 0) {
              return (
                <MenuItem disabled>
                  Veuillez choisir avant une catégorie
                </MenuItem>
              );
            }
            return subcategories.map((subOption) => (
              <MenuItem key={subOption.id} value={subOption.id.toString()}>
                {subOption.label}
              </MenuItem>
            ));
          })()}
      </Select>
    </FormControl>
  );
};

export default FormSelect;
