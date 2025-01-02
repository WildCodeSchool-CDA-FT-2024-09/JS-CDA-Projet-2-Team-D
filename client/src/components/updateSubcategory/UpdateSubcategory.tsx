import { Box, Button, TableCell, IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { useUpdateSubcategoryMutation } from "../../types/graphql-types";
import useNotification from "../../hooks/useNotification";

interface Subcategory {
  id: number;
  label: string;
  code: string;
}

function UpdateSubcategory({
  sub,
  categoryId,
  onClose,
  editSubcategoryId,
  subcategories,
}: {
  sub: Subcategory;
  categoryId: number;
  editSubcategoryId: number;
  onClose: () => void;
  subcategories: Subcategory[];
}) {
  const theme = useTheme();

  const [updateSubcategoryLabel, setUpdateSubcategoryLabel] = useState(
    sub.label,
  );
  const [updateSubcategoryCode, setUpdateSubcategoryCode] = useState(sub.code);

  const { notifyError, notifySuccess } = useNotification();

  const [updateSubcategory] = useUpdateSubcategoryMutation();

  const handleValidationSubcategory = (): boolean => {
    const changingSubcategory = subcategories.find(
      (sub) => sub.id === editSubcategoryId,
    );

    if (!changingSubcategory) {
      notifyError("Sous-catégorie introuvable");
      return false;
    }

    const isSubcategoryLabelChanged =
      changingSubcategory.label !== updateSubcategoryLabel;

    const isSubcategoryCodeChanged =
      changingSubcategory.code !== updateSubcategoryCode;

    if (!isSubcategoryLabelChanged && !isSubcategoryCodeChanged) {
      notifyError("Aucune modification effectuée");
      return false;
    }

    if (
      subcategories.find(
        (sub) =>
          sub.label === updateSubcategoryLabel && sub.id !== editSubcategoryId,
      )
    ) {
      notifyError("Cette sous-catégorie existe déjà");
      return false;
    }

    if (
      subcategories.find(
        (sub) =>
          sub.code === updateSubcategoryCode && sub.id !== editSubcategoryId,
      )
    ) {
      notifyError("Ce code de sous-catégorie existe déjà");
      return false;
    }
    return true;
  };

  const handleUpdateSubcategory = async () => {
    if (!handleValidationSubcategory()) return;
    try {
      await updateSubcategory({
        variables: {
          id: editSubcategoryId,
          label: updateSubcategoryLabel,
          code: updateSubcategoryCode,
          categoryId,
        },
        refetchQueries: ["GetCategories"],
      });
      notifySuccess("Sous-catégorie modifiée avec succès");
      onClose();
    } catch (error) {
      console.error(error);
      notifyError("Erreur lors de la modification de la sous-catégorie");
    }
  };

  return (
    <TableCell
      sx={{
        display: "flex",
        gap: "1rem",
      }}
    >
      <IconButton onClick={onClose}>
        <CreateIcon />
      </IconButton>
      <Box
        component="input"
        type="text"
        placeholder="Nom de la sous-catégorie"
        sx={{
          width: "10vh",
          maxWidth: "200px",
          height: "4vh",
          fontSize: "1.1rem",
          textAlign: "center",
          padding: "0.5vh",
        }}
        value={updateSubcategoryLabel}
        onChange={(e) => setUpdateSubcategoryLabel(e.target.value)}
      />
      <Box
        component="input"
        type="text"
        placeholder="Code de la sous-catégorie"
        sx={{
          width: "10vh",
          maxWidth: "200px",
          height: "4vh",
          fontSize: "1.1rem",
          textAlign: "center",
          padding: "0.5vh",
        }}
        value={updateSubcategoryCode}
        onChange={(e) => setUpdateSubcategoryCode(e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        <Button
          sx={{
            width: "10%",
            maxWidth: "50px",
            height: "4vh",
            fontSize: "0.6rem",
            backgroundColor: theme.palette.success.main,
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={() => {
            handleUpdateSubcategory();
          }}
        >
          Valider
        </Button>
        <Button
          sx={{
            width: "10%",
            maxWidth: "120px",
            height: "4vh",
            fontSize: "0.6rem",
            backgroundColor: theme.palette.error.main,
            color: "white",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={onClose}
        >
          Annuler
        </Button>
      </Box>
    </TableCell>
  );
}

export default UpdateSubcategory;
