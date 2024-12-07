import { useGetCategoriesQuery } from "../../types/graphql-types";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import CreateIcon from "@mui/icons-material/Create";
import { ThemeProvider } from "@mui/system";
import { createTheme } from "@mui/material/styles";

function DisplayCategory() {
  const { data, loading, error } = useGetCategoriesQuery();

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  const rows =
    data?.getCategories
      ?.map((category) =>
        (category.subcategories?.length
          ? category.subcategories
          : [{ id: null, label: null, code: null }]
        ).map((subcategory) => ({
          key: `${category.id}-${subcategory.id}`,
          categoryId: category.id,
          subcategoryId: subcategory.id || null,
          name: category.label,
          subcategory: subcategory.label || "Aucune sous-catégorie",
          code: subcategory.code || "Aucun code",
        })),
      )
      .flat() || [];

  const theme = createTheme({
    components: {
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: "bold",
            borderBottom: "1px solid black",
          },
        },
      },
    },
  });

  return (
    <TableContainer
      component={Paper}
      sx={{
        marginTop: 10,
        marginLeft: 5,
        width: {
          xs: "80%",
          sm: "95%",
          md: "90%",
          lg: "100%",
        },
      }}
    >
      <Table
        sx={{ minWidth: 650, border: 1, gap: "4px" }}
        aria-label="simple table"
      >
        <ThemeProvider theme={theme}>
          <TableHead>
            <TableRow>
              <TableCell>Catégories</TableCell>
              <TableCell align="right">Sous-Catégorie</TableCell>
              <TableCell align="right">Code</TableCell>
              <TableCell align="right">Modifier une catégorie</TableCell>
              <TableCell align="right">Modifier une sous-catégorie</TableCell>
            </TableRow>
          </TableHead>
        </ThemeProvider>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.key}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.subcategory} </TableCell>
              <TableCell align="right">{row.code}</TableCell>
              <TableCell align="right">{<CreateIcon />}</TableCell>
              <TableCell align="right">{<CreateIcon />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayCategory;
