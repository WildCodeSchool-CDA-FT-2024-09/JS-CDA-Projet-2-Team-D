import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetInvoicesToValidateOrRefusedQuery } from "../../types/graphql-types";

function DisplayInvoicesForAccountant() {
  const { loading, error, data } = useGetInvoicesToValidateOrRefusedQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const rows = data?.getInvoicesToValidateOrRefused.map((invoice) => {
    return {
      invoiceNumber: invoice.id,
      date: invoice.date,
      commission: invoice.commission?.name,
      amountHT: invoice.price_without_vat,
      vat: invoice.vat?.rate,
      amountTTC: invoice.price_without_vat * (1 + invoice.vat?.rate),
    };
  });

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Numéro</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">Comission</TableCell>
            <TableCell align="right">Montant HT</TableCell>
            <TableCell align="right">TVA</TableCell>
            <TableCell align="right">Montant TTC</TableCell>
            <TableCell align="right">Détail</TableCell>
            <TableCell align="right">Validation ou Refus</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow
              key={row.invoiceNumber}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.invoiceNumber}
              </TableCell>
              <TableCell align="right">{row.invoiceNumber}</TableCell>
              <TableCell align="right">{row.date}</TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DisplayInvoicesForAccountant;
