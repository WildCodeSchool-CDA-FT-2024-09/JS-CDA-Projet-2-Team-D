import {
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useUpdateSubcategoryMutation,
} from "../../types/graphql-types";
import { useAddSubcategoryMutation } from "../../types/graphql-types";
import { useState } from "react";
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
// import UpdateCategory from "../updateCategory/UpdateCategory";

function createData(
  label: string,
  id: number,
  creditDebit: { label: string; id: number },

  subcategories: { id: number; label: string; code: string }[],
) {
  return {
    categoryId: id,
    categoryLabel: label,
    creditDebitLabel: creditDebit.label,
    creditDebitId: creditDebit.id,
    subcategory: subcategories.map((subcategory) => ({
      id: subcategory.id,
      label: subcategory.label,
      code: subcategory.code,
    })),
  };
}

function Row(props: {
  row: ReturnType<typeof createData>;
  rows: ReturnType<typeof createData>[];
  creditDebitOptions: { id: number; label: string }[];
}) {
  const { row, rows, creditDebitOptions } = props;
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [editCategory, setEditCategory] = useState(false);
  const [editSubcategory, setEditSubcategory] = useState(false);

  const [newCategoryLabel, setNewCategoryLabel] = useState("");
  const [newCreditDebitId, setNewCreditDebitId] = useState<number>(0);

  const [newSubcategoryLabel, setNewSubcategoryLabel] = useState("");
  const [newSubcategoryCode, setNewSubcategoryCode] = useState("");

  const [updateSubcatoryLabel, setSubcatoryLabel] = useState("");
  const [updateSubcategoryCode, setUpdateSubcategoryCode] = useState("");

  const [addASubcategory] = useAddSubcategoryMutation();

  const [updateCategory] = useUpdateCategoryMutation();
  const [updateSubcategory] = useUpdateSubcategoryMutation();

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
    const isCreditDebitIdChanged =
      newCreditDebitId && newCreditDebitId !== row.creditDebitId;
    const isCategoryLabelChanged =
      newCategoryLabel && newCategoryLabel !== row.categoryLabel;

    if (!isCreditDebitIdChanged && !isCategoryLabelChanged) {
      notifyError("Aucune modification effectuée");
      return false;
    }

    if (newCreditDebitId === 0) {
      notifyError("Veuillez sélectionner un type de crédit/débit valide !");
      return false;
    }

    if (
      rows.some(
        (existingRow) =>
          existingRow.categoryLabel === newCategoryLabel &&
          existingRow.categoryId !== row.categoryId,
      )
    ) {
      notifyError("Cette catégorie existe déjà");
      return false;
    }
    return true;
  };

  const handleUpdateCategory = async () => {
    if (!handleValidationCategory()) return;

    const variables: {
      id: number;
      label: string;
      creditDebitId: number;
    } = {
      id: row.categoryId,
      label: newCategoryLabel || row.categoryLabel,
      creditDebitId: newCreditDebitId || row.creditDebitId,
    };

    try {
      await updateCategory({
        variables,
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
    setNewCreditDebitId(row.creditDebitId);
    setNewCategoryLabel(row.categoryLabel);
    setEditCategory(true);
  };

  const handleClickSubcategory = () => {
    setEditSubcategory(true);
  };

  const handleValidationSubcategory = (): boolean => {
    const isSubcategoryLabelChanged = row.subcategory.some(
      (sub) => sub.label !== updateSubcatoryLabel,
    );

    const isSubcategoryCodeChanged = row.subcategory.some(
      (sub) => sub.code !== updateSubcategoryCode,
    );

    if (!isSubcategoryLabelChanged && !isSubcategoryCodeChanged) {
      notifyError("Aucune modification effectuée");
      return false;
    }

    if (
      row.subcategory.find(
        (sub) =>
          sub.label === updateSubcatoryLabel &&
          sub.code === updateSubcategoryCode,
      )
    ) {
      notifyError("Cette sous-catégorie existe déjà");
      return false;
    }
    return true;
  };

  const handleUpdateSubcategory = async () => {
    if (!handleValidationSubcategory()) return;

    const variables = {
      id: row.subcategory[0].id,
      label: updateSubcatoryLabel,
      code: updateSubcategoryCode,
      categoryId: row.categoryId,
    };

    try {
      await updateSubcategory({
        variables,
        refetchQueries: ["GetCategories"],
      });
      setEditSubcategory(false);
      notifySuccess("Sous-catégorie modifiée avec succès");
    } catch (err) {
      console.info(err);
      notifyError("Erreur lors de la modification de la sous-catégorie");
    }
  };

  return (
    <>
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
          {/* <UpdateCategory
            categoryId={row.categoryId}
            categoryLabel={row.categoryLabel}
            creditDebitId={row.creditDebitId}
            creditDebitOption={creditDebitOptions}
            onUpdate={() => {}}
          /> */}
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
                  <TableRow>
                    <TableCell
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "900",
                        padding: "0.5rem", // Réduire le padding
                        textAlign: "left", // Aligner le texte à gauche
                        width: "50%", // Ajuster la largeur
                      }}
                    >
                      Label
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "900",
                        padding: "0.5rem", // Réduire le padding
                        textAlign: "left", // Aligner le texte à gauche
                        width: "50%", // Ajuster la largeur
                      }}
                    >
                      Code
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {editSubcategory ? (
                    <TableRow>
                      <TableCell
                        sx={{
                          display: "flex",
                          gap: "1rem",
                        }}
                      >
                        <Box
                          component="input"
                          type="text"
                          placeholder="Nom de la sous-catégorie"
                          sx={{
                            width: "70%",
                            maxWidth: "200px",
                            height: "4vh",
                            fontSize: "1.1rem",
                            textAlign: "center",
                            padding: "0.5vh",
                          }}
                          value={updateSubcatoryLabel}
                          onChange={(e) => setSubcatoryLabel(e.target.value)}
                        />
                        <Box
                          component="input"
                          type="text"
                          placeholder="Code de la sous-catégorie"
                          sx={{
                            width: "50%",
                            maxWidth: "200px",
                            height: "4vh",
                            fontSize: "1.1rem",
                            textAlign: "center",
                            padding: "0.5vh",
                          }}
                          value={updateSubcategoryCode}
                          onChange={(e) =>
                            setUpdateSubcategoryCode(e.target.value)
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
                              width: "10%",
                              maxWidth: "50px",
                              height: "4vh",
                              fontSize: "0.6rem",
                              backgroundColor: theme.palette.success.main,
                              color: "white",
                              border: "none",
                              fontWeight: "bold",
                            }}
                            onClick={handleUpdateSubcategory}
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
                            onClick={() => setEditSubcategory(false)}
                          >
                            Annuler
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <div>
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
                            <IconButton onClick={handleClickSubcategory}>
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
                    </div>
                  )}

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
    </>
  );
}

function DisplayCategorySubcategory() {
  const theme = useTheme();

  const { data, loading, error } = useGetCategoriesQuery();

  const creditDebitOptions = [
    ...new Map(
      data?.getCategories
        ?.filter((category) => category.creditDebit)
        .map((category) => [
          category.creditDebit.id,
          { id: category.creditDebit.id, label: category.creditDebit.label },
        ]),
    ).values(),
  ];

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  const rows =
    data?.getCategories.map((category) => {
      return createData(
        category.label,
        category.id,
        { id: category.creditDebit.id, label: category.creditDebit.label },
        category.subcategories || [],
      );
    }) || [];

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: 1,
        marginTop: 10,
        marginLeft: 3,
        marginRight: 3,
        width: "90%",
      }}
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
            <Row
              key={row.categoryId}
              row={row}
              rows={rows}
              creditDebitOptions={creditDebitOptions}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayCategorySubcategory;
