import { useState } from "react";
import useNotification from "../../hooks/useNotification";
import { useSetCommissionBudgetAmountMutation } from "../../types/graphql-types";
import { TableCell, TableRow, TextField } from "@mui/material";

type Commission = {
  commissionId: number;
  commissions: {
    name: string;
  };
  amount: number;
};

function BudgetRow({
  commission,
  exerciseId,
}: {
  commission: Commission;
  exerciseId: number;
}) {
  const [amount, setAmount] = useState<string>(commission.amount.toFixed(2));

  const [setCommissionBudgetAmountMutation] =
    useSetCommissionBudgetAmountMutation();

  // User feedback
  const { notifySuccess, notifyError } = useNotification();

  const handleSetBudget = async () => {
    try {
      await setCommissionBudgetAmountMutation({
        variables: {
          commissionId: commission.commissionId,
          exerciseId: Number(exerciseId),
          amount: Number(amount),
        },
      });

      notifySuccess(
        `Le budget pour la commission ${commission.commissions.name} est mis à jour avec succès`,
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du budget", error);
      notifyError(
        `Erreur lors de la mise à jour du budget de la commission ${commission.commissions.name}`,
      );
    }
  };

  return (
    <>
      <TableRow>
        <TableCell align="left">{commission.commissions.name}</TableCell>
        <TableCell align="right">
          <TextField
            id="standard-basic"
            aria-label="Montant"
            variant="standard"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onBlur={handleSetBudget}
            sx={{
              "& input": {
                textAlign: "right",
              },
            }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

export default BudgetRow;
