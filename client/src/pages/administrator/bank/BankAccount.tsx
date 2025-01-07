import { useGetBanksQuery, Bank } from "../../../types/graphql-types";
import BankAccountRow from "../../../components/bank/BankAccountRow";
import PageTitle from "../../../components/PageTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

export default function BankAccount() {
  const { data, loading, error } = useGetBanksQuery();

  if (loading) return <p>🥁 Chargement...</p>;
  if (error) return <p>☠️ Erreur: {error.message}</p>;

  const banks: Bank[] =
    data?.getBanks.map((bank) => ({
      id: bank.id,
      label: bank.label,
      bankAccounts:
        bank.bankAccounts?.map((bankAccount) => ({
          id: bankAccount.id,
          name: bankAccount.name,
          account_number: bankAccount.account_number,
          balance: bankAccount.balance,
          bank: {
            id: bank.id,
            label: bank.label,
            bankAccounts: [],
          },
        })) ?? [],
    })) ?? [];

  return (
    <>
      <PageTitle title="Comptes bancaires" />

      <TableContainer component={Paper} sx={{ marginTop: "1em" }}>
        <Table sx={{ minWidth: 650 }} aria-label="Tableau des exercices">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Libellé</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {banks.map((bank) => (
              <BankAccountRow key={bank.id} bank={bank} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
