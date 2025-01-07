import { useParams } from "react-router-dom";
import { useGetExerciseBudgetsQuery } from "../../../types/graphql-types";
import BtnLink from "../../../components/BtnLink";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Paper from "@mui/material/Paper";
import BudgetRow from "../../../components/exercise/BudgetRow";

function SetupBudgets() {
  const { exerciseId } = useParams();

  const { data, loading, error } = useGetExerciseBudgetsQuery({
    variables: {
      exerciseId: parseInt(exerciseId as string),
    },
  });

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ marginBottom: "1em", fontSize: "2em" }}>
          Mise en place des budgets {data?.getExerciseBudgets[0].exercise.label}
        </Typography>
        <BtnLink
          to="/administrator/exercise"
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
          Retour
        </BtnLink>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: "1em" }}>
        <Table sx={{ minWidth: 650 }} aria-label="Tableau des exercices">
          <TableHead>
            <TableRow>
              <TableCell align="left">Commission</TableCell>
              <TableCell align="right">Montant</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.getExerciseBudgets.map((commission) => (
                <BudgetRow
                  key={commission.commissionId}
                  commission={commission}
                  exerciseId={parseInt(exerciseId as string)}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SetupBudgets;
