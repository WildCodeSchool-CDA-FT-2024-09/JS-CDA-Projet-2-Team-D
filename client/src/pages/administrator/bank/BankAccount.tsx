import { Bank } from "../../../types/graphql-types";
import { useBankAccounts } from "../../../hooks/useBankAccount";
import BankAccountRow from "../../../components/bank/BankAccountRow";
import PageTitle from "../../../components/PageTitle";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function BankAccount() {
  const { banks, loading, error } = useBankAccounts();

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  return (
    <>
      <PageTitle title="Comptes bancaires" />
      <TableContainer
        component={Paper}
        sx={{ marginTop: "1em" }}
        data-testid="bank-accounts-table"
      >
        <Table
          sx={{ minWidth: 650 }}
          aria-label="Tableau des comptes bancaires"
        >
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Libellé</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banks.map((bank: Bank) => (
              <BankAccountRow key={bank.id} bank={bank} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
