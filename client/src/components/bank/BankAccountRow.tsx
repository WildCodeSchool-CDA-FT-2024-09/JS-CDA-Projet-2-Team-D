import { useState } from "react";
import { Bank, BankAccount } from "../../types/graphql-types";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function BankAccountRow({ bank }: { bank: Bank }) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <TableRow
        hover
        key={bank.id}
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell>
          <IconButton
            aria-label="détail des comptes de la banque"
            role="button"
            size="small"
            data-testid={`expand-bank-accounts-button-${bank.id}`}
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" sx={{ fontWeight: "bold" }}>
          {bank.label}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Libellé</TableCell>
                    <TableCell align="right">Numéro de compte</TableCell>
                    <TableCell align="right">Solde</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {bank.bankAccounts?.map((bankAccount: BankAccount) => (
                    <TableRow hover key={bankAccount.id}>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ fontWeight: "bold" }}
                      >
                        {bankAccount.name}
                      </TableCell>
                      <TableCell align="right">
                        N° {bankAccount.account_number}
                      </TableCell>
                      <TableCell align="right">
                        {bankAccount.balance.toFixed(2)} €
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default BankAccountRow;
