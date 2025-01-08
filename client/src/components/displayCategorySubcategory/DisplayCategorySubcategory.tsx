import { useGetCategoriesQuery } from "../../types/graphql-types";
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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
import AddSubcategory from "../addSubcategory/AddSubcategory";
import UpdateSubcategory from "../updateSubcategory/UpdateSubcategory";

function Row(props: {
  row: ReturnType<typeof createData>;
  rows: ReturnType<typeof createData>[];
  creditDebitOptions: { id: number; label: string }[];
}) {
  const { row, rows, creditDebitOptions } = props;
  const [open, setOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(false);

  const [editSubcategoryId, setEditSubcategoryId] = useState<number>(0);

  const theme = useTheme();

  interface Subcategory {
    id: number;
    label: string;
    code: string;
  }

  const handleEditSubcategory = (sub: Subcategory) => {
    setEditSubcategoryId(sub.id);
  };

  const handleClickCategory = () => {
    setEditCategory(true);
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
                        <UpdateSubcategory
                          sub={sub}
                          categoryId={row.categoryId}
                          subcategories={row.subcategory}
                          editSubcategoryId={editSubcategoryId}
                          onClose={() => setEditSubcategoryId(0)}
                        />
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

                  <AddSubcategory
                    categoryId={row.categoryId}
                    subcategories={row.subcategory}
                  />
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
            <TableCell sx={{ color: "black", fontSize: "1.5rem" }}>
              Catégorie
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: "black",
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
