import { useGetExercisesQuery } from "../../../types/graphql-types";
import ExerciseRow from "../../../components/exercise/ExerciseRow";
import BtnLink from "../../../components/BtnLink";
import PageTitle from "../../../components/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

export default function ManageExercise() {
  const { data, loading, error } = useGetExercisesQuery();

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  return (
    <>
      <PageTitle title="Gestion des exercices">
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
      </PageTitle>

      <TableContainer component={Paper} sx={{ marginTop: "1em" }}>
        <Table sx={{ minWidth: 650 }} aria-label="Tableau des exercices">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Libellé</TableCell>
              <TableCell align="left">Début</TableCell>
              <TableCell align="left">Fin</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getExercises.map((exercise) => (
                <ExerciseRow key={exercise.id} exercise={exercise} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
