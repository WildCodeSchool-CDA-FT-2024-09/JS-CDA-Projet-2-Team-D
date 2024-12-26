import {
  useGetCategoriesQuery,
  useUpdateSubcategoryMutation,
  useAddSubcategoryMutation,
} from "../../types/graphql-types";
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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Button } from "@mui/material";

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

import UpdateCategory from "../updateCategory/UpdateCategory";

function Row(props: {
  row: ReturnType<typeof createData>;
  rows: ReturnType<typeof createData>[];
  creditDebitOptions: { id: number; label: string }[];
}) {
  const { row, rows, creditDebitOptions } = props;
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  const [editSubcategoryId, setEditSubcategoryId] = useState<number>(0);

  const [newSubcategoryLabel, setNewSubcategoryLabel] = useState("");
  const [newSubcategoryCode, setNewSubcategoryCode] = useState("");

  const [updateSubcategoryLabel, setUpdateSubcategoryLabel] = useState("");
  const [updateSubcategoryCode, setUpdateSubcategoryCode] = useState("");

  const [addASubcategory] = useAddSubcategoryMutation();

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

  interface Subcategory {
    id: number;
    label: string;
    code: string;
  }

  const handleEditSubcategory = (sub: Subcategory) => {
    setEditSubcategoryId(sub.id);
    setUpdateSubcategoryLabel(sub.label);
    setUpdateSubcategoryCode(sub.code);
  };

  const handleCancelEditSubcategory = () => {
    setEditSubcategoryId(0);
    setUpdateSubcategoryCode("");
    setUpdateSubcategoryLabel("");
  };

  const handleClickCategory = () => {
    setEditCategory(true);
  };

  const handleValidationSubcategory = (): boolean => {
    const changingSubcategory = row.subcategory.find(
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
      row.subcategory.find(
        (sub) =>
          sub.label === updateSubcategoryLabel && sub.id !== editSubcategoryId,
      )
    ) {
      notifyError("Cette sous-catégorie existe déjà");
      return false;
    }

    if (
      row.subcategory.find(
        (sub) =>
          sub.code === updateSubcategoryCode && sub.id !== editSubcategoryId,
      )
    ) {
      notifyError("Ce code de sous-catégorie existe déjà");
      return false;
    }
    return true;
  };

  const handleUpdateSubcategory = async (
    id: number,
    label: string,
    code: string,
  ) => {
    if (!handleValidationSubcategory()) return;

    const variables = {
      id,
      label,
      code,
      categoryId: row.categoryId,
    };

    try {
      await updateSubcategory({
        variables,
        refetchQueries: ["GetCategories"],
      });
      setEditSubcategoryId(0);
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
          {editCategory ? (
            <UpdateCategory
              categoryId={row.categoryId}
              categoryLabel={row.categoryLabel}
              creditDebitId={row.creditDebitId}
              creditDebitOptions={creditDebitOptions}
              categories={rows.map((row) => ({
                id: row.categoryId,
                label: row.categoryLabel,
                creditDebitId: row.creditDebitId,
              }))}
              onClose={() => setEditCategory(false)}
            />
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
                        padding: "0.5rem",
                        textAlign: "left",
                        width: "50%",
                      }}
                    >
                      <IconButton>
                        <ArrowForwardIosIcon />
                      </IconButton>
                      Label
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: "1.2rem",
                        fontWeight: "900",
                        padding: "0.5rem",
                        textAlign: "left",
                        width: "50%",
                      }}
                    >
                      <IconButton>
                        <ArrowForwardIosIcon />
                      </IconButton>
                      Code
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subcategory.map((sub) => (
                    <TableRow key={sub.id}>
                      {editSubcategoryId === sub.id ? (
                        <TableCell
                          sx={{
                            display: "flex",
                            gap: "1rem",
                          }}
                        >
                          <IconButton onClick={() => setEditSubcategoryId(0)}>
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
                            onChange={(e) =>
                              setUpdateSubcategoryLabel(e.target.value)
                            }
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
                              onClick={() => {
                                handleUpdateSubcategory(
                                  sub.id,
                                  updateSubcategoryLabel,
                                  updateSubcategoryCode,
                                );
                                setEditSubcategoryId(0);
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
                              onClick={handleCancelEditSubcategory}
                            >
                              Annuler
                            </Button>
                          </Box>
                        </TableCell>
                      ) : (
                        <>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{
                              verticalAlign: "middle",
                              textAlign: "left",
                              width: "50%",
                            }}
                          >
                            <IconButton
                              onClick={() => handleEditSubcategory(sub)}
                            >
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
                              marginLeft: "1rem",
                            }}
                          >
                            <IconButton
                              onClick={() => handleEditSubcategory(sub)}
                            >
                              <CreateIcon />
                            </IconButton>
                            {sub.code}
                          </TableCell>
                        </>
                      )}
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
