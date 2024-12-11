import { useGetCategoriesQuery } from "../../types/graphql-types";
import { useAddSubcategoryMutation } from "../../types/graphql-types";

import { useState } from "react";

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

function createData(
  label: string,
  id: number,
  subcategories: { id: number; label: string; code: string }[],
) {
  return {
    categoryId: id,
    categoryLabel: label,
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

  const [newSubcategoryLabel, setNewSubcategoryLabel] = useState("");
  const [newSubcategoryCode, setNewSubcategoryCode] = useState("");

  const [addASubcategory] = useAddSubcategoryMutation();

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
          {row.categoryLabel}
        </TableCell>
        <TableCell align="center">
          <IconButton>{<CreateIcon />}</IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                  <TableRow sx={{ fontSize: "4rem" }}>
                    <TableCell>
                      <Typography
                        sx={{ fontSize: "1.2rem", fontWeight: "900" }}
                      >
                        Label
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.2rem", fontWeight: "900" }}>
                      Code
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.subcategory.map((sub) => (
                    <TableRow key={sub.id}>
                      <TableCell component="th" scope="row">
                        {sub.label}
                        <IconButton>{<CreateIcon />}</IconButton>
                      </TableCell>

                      <TableCell>{sub.code}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

                <TableCell sx={{ paddingBottom: "2vh", fontSize: "1.1rem" }}>
                  <IconButton onClick={() => setShowInput(!showInput)}>
                    {<AddCircleOutline />}
                  </IconButton>
                  Ajouter une sous-catégorie
                  {showInput && (
                    <Box sx={{ gap: "50px" }}>
                      <TableRow
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "10px",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box
                            component="input"
                            type="text"
                            placeholder="Nom de la sous-catégorie"
                            sx={{
                              width: "15vw",
                              height: "4vh",
                              fontSize: "1.1rem",
                              marginBottom: "2vh",
                              "&::placeholder": {
                                color: "grey",
                              },
                            }}
                            value={newSubcategoryLabel}
                            onChange={(e) =>
                              setNewSubcategoryLabel(e.target.value)
                            }
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ alignItems: "right" }}
                        >
                          <input
                            type="text"
                            placeholder="Code de la sous-catégorie"
                            style={{
                              width: "15vw",
                              height: "4vh",
                              fontSize: "1.1rem",
                              marginBottom: "2vh",
                              border: "1px solid black",
                            }}
                            value={newSubcategoryCode}
                            onChange={(e) =>
                              setNewSubcategoryCode(e.target.value)
                            }
                          />
                        </TableCell>
                      </TableRow>

                      <button
                        style={{
                          width: "10vw",
                          height: "4vh",
                          fontSize: "1.1rem",
                          marginBottom: "2vh",
                        }}
                        onClick={() => {
                          addASubcategory({
                            variables: {
                              label: newSubcategoryLabel,
                              code: newSubcategoryCode,
                              categoryId: row.categoryId,
                            },
                          });
                        }}
                      >
                        Valider
                      </button>
                      <button
                        style={{
                          width: "10vw",
                          height: "4vh",
                          fontSize: "1.1rem",
                          marginBottom: "2vh",
                        }}
                        onClick={() => setShowInput(!showInput)}
                      >
                        Annuler
                      </button>
                    </Box>
                  )}
                </TableCell>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function DisplayCategory2() {
  const theme = useTheme();

  const { data, loading, error } = useGetCategoriesQuery();

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  const rows =
    data?.getCategories.map((category) => {
      return createData(
        category.label,
        category.id,
        category.subcategories || [],
      );
    }) || [];

  return (
    <TableContainer
      component={Paper}
      sx={{ border: 1, marginTop: 10, marginLeft: 3 }}
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
              sx={{ color: "white", fontSize: "1.5rem" }}
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

export default DisplayCategory2;
