import { useParams } from "react-router-dom";
import { useGetExerciseBudgetsQuery } from "../../../types/graphql-types";
import BtnLink from "../../../components/BtnLink";
import PageTitle from "../../../components/PageTitle";
import BudgetRow from "../../../components/exercise/BudgetRow";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Paper from "@mui/material/Paper";

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
      <PageTitle title="Repartition budgets : {data?.getExerciseBudgets[0].exercise.label}">
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
      </PageTitle>

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
