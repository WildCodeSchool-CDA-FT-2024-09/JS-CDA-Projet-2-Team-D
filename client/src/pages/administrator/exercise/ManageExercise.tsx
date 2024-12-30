import { useGetExercisesQuery } from "../../../types/graphql-types";
import { formatDate } from "../../../utils/dateUtils";
import BtnLink from "../../../components/BtnLink";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";

export default function ManageExercise() {
  const { data, loading, error } = useGetExercisesQuery();

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  return (
    <div>
      <h1>Gestion des exercices</h1>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <BtnLink
          to="/administrator/exercise/add"
          sx={{
            marginLeft: "auto",
            backgroundColor: "primary.main",
            padding: "6px 8px",
            color: "primary.contrastText",
            textTransform: "uppercase",
            borderRadius: "4px",
            textAlign: "center",
            fontSize: ".9em",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Ajouter un exercise
        </BtnLink>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Tableau des exercices">
          <TableHead>
            <TableRow>
              <TableCell align="left">Libellé</TableCell>
              <TableCell align="left">Début</TableCell>
              <TableCell align="left">Fin</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getExercises.map((exercise) => (
                <TableRow
                  key={exercise.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left" sx={{ fontWeight: "bold" }}>
                    {exercise.label}
                  </TableCell>
                  <TableCell align="left">
                    {formatDate(exercise.start_date)}
                  </TableCell>
                  <TableCell align="left">
                    {formatDate(exercise.end_date)}
                  </TableCell>
                  <TableCell align="left">
                    <Stack spacing={2} direction="row">
                      <BtnLink
                        to="/administrator/exercise"
                        sx={{
                          marginLeft: "auto",
                          backgroundColor: "secondary.main",
                          padding: "6px 8px",
                          color: "secondary.contrastText",
                          textTransform: "uppercase",
                          borderRadius: "4px",
                          textAlign: "center",
                          fontSize: ".9em",
                          "&:hover": {
                            backgroundColor: "primary.dark",
                          },
                        }}
                      >
                        Voir
                      </BtnLink>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
