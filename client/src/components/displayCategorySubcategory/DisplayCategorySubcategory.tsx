import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "../../types/graphql-types";
import { useAddSubcategoryMutation } from "../../types/graphql-types";

import React, { useState } from "react";

import useNotification from "../../hooks/useNotification";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Collapse,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CreateIcon from "@mui/icons-material/Create";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

import { Button } from "@mui/material";

function createData(
  label: string,
  id: number,
  creditDebit: { label: string },
  subcategories: { id: number; label: string; code: string }[],
) {
  return {
    categoryId: id,
    categoryLabel: label,
    creditDebitLabel: creditDebit.label,
    subcategory: subcategories.map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.label,
      code: subcategory.code,
    })),
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [creditDebitId, setCreditDebitId] = useState<number>(0);

  const [newSubcategoryLabel, setNewSubcategoryLabel] = useState("");
  const [newSubcategoryCode, setNewSubcategoryCode] = useState("");

  const [addASubcategory] = useAddSubcategoryMutation();

  const [updateCategory] = useUpdateCategoryMutation();

  const { notifySuccess, notifyError } = useNotification();

  const theme = useTheme();

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
    if (row.subcategory.find((sub) => sub.label === newSubcategoryLabel)) {
      notifyError("Cette sous-catégorie existe déjà");
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
          categoryId: row.categoryId,
        },
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

  const handleValidationCategory = (): boolean => {
    if (!newCategoryLabel) {
      notifyError(
        "Veuillez mettre mettre à jour le champ 'Nom de la catégorie'",
      );
      return false;
    }

    if (row.categoryLabel === newCategoryLabel) {
      notifyError("Le nom de la catégorie n'a pas changé");
      return false;
    }

    if (creditDebitId === 0) {
      notifyError("Veuillez sélectionner un type de crédit/débit valide !");
      return false;
    }

    if (
      row.categoryLabel === newCategoryLabel &&
      row.creditDebitLabel === String(creditDebitId)
    ) {
      notifyError("Aucune modification n'a été apportée");
      return false;
    }
    return true;
  };

  const handleUpdateCategory = async () => {
    if (!handleValidationCategory()) return;
    try {
      await updateCategory({
        variables: {
          id: row.categoryId,
          label: newCategoryLabel,
          creditDebitId: 1,
        },
        refetchQueries: ["GetCategories"],
      });
      setEditCategory(false);
      notifySuccess("Catégorie modifiée avec succès");
    } catch (err) {
      console.info(err);
      notifyError("Erreur lors de la modification de la catégorie");
    }
  };

  const handleClickCategory = () => {
    setEditCategory(true);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon sx={{ fontSize: "2rem" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ fontSize: "2rem" }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" sx={{ fontSize: "1.3rem" }}>
          {editCategory ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

                padding: "1rem",
                borderRadius: "8px",
                width: "100%",
                backgroundColor: "white",
              }}
            >
              <Box
                component="input"
                type="text"
                placeholder={`${row.categoryLabel}`}
                value={newCategoryLabel}
                onChange={(e) => setNewCategoryLabel(e.target.value)}
                onBlur={handleUpdateCategory}
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleUpdateCategory();
                  }
                  if (e.key === "Escape") {
                    setEditCategory(false);
                  }
                }}
                sx={{
                  fontSize: "2rem",
                  width: "100%",
                  padding: "0.5rem",
                  boxSizing: "border-box",
                  border: "none",
                }}
              />
              <Box
                component="select"
                value={creditDebitId}
                onChange={(e) => setCreditDebitId(Number(e.target.value))}
                sx={{
                  fontSize: "1.2rem",
                  color: theme.palette.primary.main,
                  width: "50%",
                  padding: "0.5rem",
                  boxSizing: "border-box",
                  marginBottom: "1.5rem",
                }}
              >
                <option value="0">Crédit ou Débit ?</option>
                <option value="1">Débit</option>
                <option value="2">Crédit</option>
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
                  onClick={() => setEditCategory(false)}
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
            </div>
          ) : (
            <div>
              <div style={{ fontSize: "2rem" }}>{row.categoryLabel}</div>
              <div
                style={{
                  fontSize: "1.2rem",
                  color: theme.palette.primary.main,
                }}
              >
                {row.creditDebitLabel}
              </div>
            </div>
          )}
        </TableCell>

        <TableCell align="center">
          <IconButton onClick={handleClickCategory}>
            {<CreateIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography
                gutterBottom
                component="div"
                sx={{ fontSize: "1.3rem" }}
              >
                Sous-catégorie(s)
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{ marginBottom: "4vh" }}
              >
                <TableHead>
                  <TableRow sx={{ fontSize: "4rem", gap: "1vw" }}>
                    <TableCell>
                      <Typography
                        sx={{
                          fontSize: "1.2rem",
                          fontWeight: "900",
                          display: "flex",
                        }}
                      >
                        Label
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "900",
                        display: "flex",
                        alignItems: "center",
                        paddingRight: 0,
                        paddingTop: 1.5,
                      }}
                    >
                      Code
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subcategory.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{
                          verticalAlign: "middle",
                          textAlign: "left",
                          width: "50%",
                        }}
                      >
                        <IconButton>
                          <CreateIcon />
                        </IconButton>
                        {sub.label}
                      </TableCell>

                      <TableCell
                        sx={{
                          verticalAlign: "middle",
                          textAlign: "left",
                          width: "50%",
                          textTransform: "uppercase",
                        }}
                      >
                        {sub.code}
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell
                      sx={{ paddingBottom: "5vh", fontSize: "1.1rem" }}
                    >
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
                              onChange={(e) =>
                                setNewSubcategoryLabel(e.target.value)
                              }
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
                              onChange={(e) =>
                                setNewSubcategoryCode(e.target.value)
                              }
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
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function DisplayCategorySubcategory() {
  const theme = useTheme();

  const { data, loading, error } = useGetCategoriesQuery();

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  const rows =
    data?.getCategories.map((category) => {
      return createData(
        category.label,
        category.id,
        { label: category.creditDebit.label },
        category.subcategories || [],
      );
    }) || [];

  return (
    <TableContainer
      component={Paper}
      sx={{ border: 1, marginTop: 10, marginLeft: 3, width: "100%" }}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
            <TableCell />
            <TableCell sx={{ color: "white", fontSize: "1.5rem" }}>
              Catégorie
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "white",
                fontSize: "1.5rem",
              }}
            >
              Modifier une catégorie
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.categoryId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayCategorySubcategory;
