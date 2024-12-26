import { useState } from "react";
import { useAddSubcategoryMutation } from "../../types/graphql-types";
import {
  TableRow,
  TableCell,
  Typography,
  IconButton,
  Box,
  Button,
  useTheme,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import useNotification from "../../hooks/useNotification";

interface AddSubcategoryProps {
  subcategories: { id: number; label: string; code: string }[];
  categoryId: number;
}

function AddSubcategory({ subcategories, categoryId }: AddSubcategoryProps) {
  const theme = useTheme();
  const [showInput, setShowInput] = useState(false);
  const [newSubcategoryLabel, setNewSubcategoryLabel] = useState("");
  const [newSubcategoryCode, setNewSubcategoryCode] = useState("");

  const [addASubcategory] = useAddSubcategoryMutation();
  const { notifyError, notifySuccess } = useNotification();

  const handleValidation = (): boolean => {
    if (!newSubcategoryLabel && !newSubcategoryCode) {
      notifyError("Veuillez remplir les champs");
      return false;
    }
    if (!newSubcategoryLabel) {
      notifyError("Veuillez remplir le champ 'Nom de la sous-catégorie'");
      return false;
    }

    if (!newSubcategoryCode) {
      notifyError("Veuillez remplir le champ 'Code de la sous-catégorie'");
      return false;
    }
    if (
      subcategories.some(
        (subcategory) =>
          subcategory.label.toLowerCase() === newSubcategoryLabel.toLowerCase(),
      )
    ) {
      notifyError("Ce nom de sous-catégorie existe déjà !");
      return false;
    }

    if (
      subcategories.some(
        (subcategory) =>
          subcategory.code.toLowerCase() === newSubcategoryCode.toLowerCase(),
      )
    ) {
      notifyError("Ce code de sous-catégorie existe déjà !");
      return false;
    }
    return true;
  };

  const handleClick = async () => {
    if (!handleValidation()) return;

    try {
      await addASubcategory({
        variables: {
          label: newSubcategoryLabel,
          code: newSubcategoryCode,
          categoryId,
        },
        refetchQueries: ["GetCategories"],
      });

      setNewSubcategoryLabel("");
      setNewSubcategoryCode("");
      setShowInput(!showInput);
      notifySuccess("Sous-catégorie ajoutée avec succès");
    } catch (err) {
      console.info(err);
      notifyError("Erreur lors de l'ajout de la sous-catégorie");
    }
  };

  return (
    <TableRow>
      <TableCell sx={{ paddingBottom: "5vh", fontSize: "1.1rem" }}>
        <Typography>
          <IconButton onClick={() => setShowInput(!showInput)}>
            <AddCircleOutline />
          </IconButton>
          Ajouter une sous-catégorie
        </Typography>
        {showInput && (
          <Box
            sx={{
              marginTop: "2rem",
              padding: "1rem",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Box
                component="input"
                type="text"
                placeholder="Nom de la sous-catégorie"
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "4vh",
                  fontSize: "1.1rem",
                  textAlign: "center",
                  padding: "0.5vh",
                }}
                value={newSubcategoryLabel}
                onChange={(e) => setNewSubcategoryLabel(e.target.value)}
              />
              <Box
                component="input"
                type="text"
                placeholder="Code de la sous-catégorie"
                sx={{
                  width: "100%",
                  maxWidth: "300px",
                  height: "4vh",
                  fontSize: "1.1rem",
                  textAlign: "center",
                  padding: "0.5vh",
                }}
                value={newSubcategoryCode}
                onChange={(e) => setNewSubcategoryCode(e.target.value)}
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
                    width: "100%",
                    maxWidth: "120px",
                    height: "4vh",
                    fontSize: "1.1rem",
                    backgroundColor: theme.palette.success.main,
                    color: "white",
                    border: "none",
                    fontWeight: "bold",
                  }}
                  onClick={handleClick}
                >
                  Valider
                </Button>
                <Button
                  sx={{
                    width: "100%",
                    maxWidth: "120px",
                    height: "4vh",
                    fontSize: "1.1rem",
                    backgroundColor: theme.palette.error.main,
                    color: "white",
                    border: "none",
                    fontWeight: "bold",
                  }}
                  onClick={() => setShowInput(false)}
                >
                  Annuler
                </Button>
              </Box>
            </Box>
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
}

export default AddSubcategory;
