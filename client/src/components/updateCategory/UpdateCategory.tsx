import { useState } from "react";
import { Button, Box, useTheme } from "@mui/material";
import { useUpdateCategoryMutation } from "../../types/graphql-types";
import useNotification from "../../hooks/useNotification";

interface UpdateCategoryProps {
  categoryId: number;
  categoryLabel: string;
  creditDebitId: number;
  creditDebitOptions: {
    id: number;
    label: string;
  }[];
  categories: { id: number; label: string }[];
  onClose: () => void;
}

function UpdateCategory({
  categoryId,
  categoryLabel,
  creditDebitId,
  creditDebitOptions,
  categories,
  onClose,
}: UpdateCategoryProps) {
  const [newCategoryLabel, setNewCategoryLabel] = useState(categoryLabel);
  const [newCreditDebitId, setNewCreditDebitId] = useState<number>(
    creditDebitId as number,
  );
  const { notifyError, notifySuccess } = useNotification();
  const [updateCategory] = useUpdateCategoryMutation();
  const theme = useTheme();

  const handleValidationCategory = (): boolean => {
    if (!newCategoryLabel.trim()) {
      notifyError("Veuillez renseigner un nom de catégorie");
      return false;
    }
    if (!newCreditDebitId) {
      notifyError("Veuillez renseigner un type de credit/debit valide");
      return false;
    }
    if (
      newCategoryLabel === categoryLabel &&
      newCreditDebitId === creditDebitId
    ) {
      notifyError("Aucune modification apportée");
      return false;
    }

    if (
      categories.some(
        (category) =>
          category.label.toLowerCase() === newCategoryLabel.toLowerCase() &&
          category.id !== categoryId,
      )
    ) {
      notifyError("Une catégorie avec ce nom existe déjà");
      return false;
    }

    return true;
  };

  const handleUpdateCategory = async () => {
    if (!handleValidationCategory()) return;

    try {
      await updateCategory({
        variables: {
          id: categoryId,
          label: newCategoryLabel,
          creditDebitId: newCreditDebitId,
        },
        refetchQueries: ["GetCategories"],
      });
      notifySuccess("Catégorie modifiée avec succès");
      onClose();
    } catch (err) {
      console.error(err);
      notifyError("Erreur lors de la modification de la catégorie");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      <Box
        component="input"
        type="text"
        value={newCategoryLabel}
        onChange={(e) => setNewCategoryLabel(e.target.value)}
        sx={{
          fontSize: "1.5rem",
          padding: "0.5rem",
          border: "1px solid rgba(0, 0, 0, 0.3)",
          borderRadius: "4px",
        }}
      />
      <Box
        component="select"
        value={newCreditDebitId}
        onChange={(e) => setNewCreditDebitId(Number(e.target.value))}
        sx={{
          fontSize: "1.2rem",
          color: theme.palette.primary.main,
          width: "50%",
          padding: "0.5rem",
          boxSizing: "border-box",
          marginBottom: "1.5rem",
        }}
      >
        {creditDebitOptions.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </Box>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          alignItems: "flex-start",
        }}
      >
        <Button
          sx={{
            backgroundColor: theme.palette.error.main,
            color: "white",
            fontWeight: "bold",
            border: "none",
            width: "90%",
            maxWidth: "120px",
            height: "4vh",
            fontSize: "1.1rem",
            marginRight: "8rem",
          }}
          onClick={() => onClose()}
        >
          Annuler
        </Button>
        <Button
          onClick={() => handleUpdateCategory()}
          sx={{
            backgroundColor: theme.palette.success.main,
            color: "white",
            fontWeight: "bold",
            border: "none",
            width: "90%",
            maxWidth: "120px",
            height: "4vh",
            fontSize: "1.1rem",
            marginRight: "20rem",
          }}
        >
          Valider
        </Button>
      </div>
    </Box>
  );
}

export default UpdateCategory;
