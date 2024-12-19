import { useState } from "react";

import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
} from "../../types/graphql-types";

import useNotification from "../../hooks/useNotification";

import Grid from "@mui/material/Grid2";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  Box,
  TextField,
  styled,
  Typography,
  Button,
} from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "white",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  border: "1px solid gray",
}));

function AddCategory() {
  const [category, setCategory] = useState<string>("");
  const [creditDebitId, setCreditDebitId] = useState<number>(0);
  const [addCategoryMutation, { loading, error }] = useAddCategoryMutation();

  const { notifyError, notifySuccess } = useNotification();

  const existingCategories = useGetCategoriesQuery();

  const handleValidation = (): boolean => {
    if (category.trim() === "") {
      notifyError("Veuillez entrer un libellé de catégorie !");
      return false;
    }
    if (creditDebitId === 0) {
      notifyError("Veuillez sélectionner un type de crédit/débit valide !");
      return false;
    }

    if (
      existingCategories.data?.getCategories.find(
        (c) => c.label.toLowerCase() === category,
      )
    ) {
      notifyError("Cette catégorie existe déjà !");
      return false;
    }

    return true;
  };

  const handleAddCategory = async (): Promise<void> => {
    if (!handleValidation()) {
      return;
    }
    if (category.trim() !== "") {
      try {
        const result = await addCategoryMutation({
          variables: {
            label: category,
            creditDebitId,
          },
          refetchQueries: ["GetCategories"],
        });
        console.info("Nouvelle catégorie ajoutée :", result.data);
        notifySuccess("Catégorie ajoutée avec succès !");
        setCategory("");
        setCreditDebitId(0);
      } catch (err) {
        console.error("Erreur lors de l'ajout de la catégorie :", err);
        notifyError("Erreur lors de l'ajout de la catégorie : " + err);
      }
    } else {
      alert("Veuillez entrer une catégorie !");
    }
  };

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Item sx={{ padding: 5 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textAlign: "left", color: "black" }}
            >
              Veuillez saisir une nouvelle catégorie :
            </Typography>
            <TextField
              label="Nouvelle catégorie"
              variant="outlined"
              fullWidth
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{
                marginBottom: 2,
                backgroundColor: "#EFEFEF",
                width: {
                  xs: "100%",
                  sm: "80%",
                  md: "60%",
                  lg: "50%",
                },
              }}
              slotProps={{
                inputLabel: {
                  sx: {
                    color: "#9e9e9e",
                  },
                },
              }}
            />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <Typography
                sx={{ color: "black", marginBottom: 1, textAlign: "left" }}
                variant="h6"
              >
                Sélectionnez Crédit ou Débit
              </Typography>
              <InputLabel id="credit-debit-select-label"></InputLabel>
              <Select
                labelId="credit-debit-select-label"
                value={creditDebitId}
                onChange={(e) => setCreditDebitId(Number(e.target.value))}
                sx={{
                  backgroundColor: "#EFEFEF",
                  color: "#9e9e9e",
                  width: {
                    xs: "100%",
                    sm: "80%",
                    md: "60%",
                    lg: "50%",
                  },
                }}
              >
                <MenuItem value={0} sx={{ color: "#9e9e9e" }} disabled>
                  Crédit ou Débit
                </MenuItem>
                <MenuItem value={1} sx={{ color: "#9e9e9e" }}>
                  Crédit
                </MenuItem>
                <MenuItem value={2} sx={{ color: "#9e9e9e" }}>
                  Débit
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
              sx={{
                display: "block",
                margin: "0 auto",
                marginTop: 2,
              }}
              disabled={loading}
            >
              {loading ? "Ajout en cours..." : "Ajouter la catégorie"}
              {error && (
                <Typography color="error" sx={{ marginTop: 2 }}>
                  Une erreur s'est produite : {error.message}
                </Typography>
              )}
            </Button>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddCategory;
