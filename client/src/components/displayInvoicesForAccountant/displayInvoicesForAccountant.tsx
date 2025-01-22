import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Box } from "@mui/system";

import { Link } from "react-router-dom";

import { useGetInvoicesToValidateOrRefusedQuery } from "../../types/graphql-types";

function DisplayInvoicesForAccountant() {
  const { loading, error, data } = useGetInvoicesToValidateOrRefusedQuery();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("GraphQL error: ", error);
    return (
      <div>
        <p>Error :(</p>;<pre>{JSON.stringify(error, null, 2)}</pre>;
      </div>
    );
  }

  const rows = data?.getInvoicesToValidateOrRefused.map((invoice) => ({
    invoiceId: invoice.id,
    date: invoice.date,
    commission: invoice.commission?.name,
    amountHT: invoice.price_without_vat,
    vat: invoice.vat?.rate,
    amountTTC: invoice.price_without_vat * (1 + invoice.vat?.rate / 100),
    status: invoice.status.label,
  }));

  return (
    <Box>
      <Box
        sx={{
          marginBottom: "1rem",
          textAlign: isMobile ? "center" : "left",
          fontSize: isMobile ? "0.6rem" : "1rem",
          fontWeight: "bold",
        }}
      >
        <h1>Liste des factures en attente et refusées</h1>
      </Box>

      {rows?.length === 0 ? (
        <Box
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            textAlign: "left",
          }}
        >
          Aucune facture actuellement
        </Box>
      ) : !isMobile ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  "& .MuiTableCell-root": {
                    color: "inherit",
                    fontWeight: "inherit",
                    fontSize: "inherit",
                  },
                }}
              >
                <TableCell>Numéro</TableCell>
                <TableCell align="right">Date</TableCell>
                <TableCell align="right">Commission</TableCell>
                <TableCell align="right">Montant HT</TableCell>
                <TableCell align="right">TVA</TableCell>
                <TableCell align="right">Montant TTC</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Détail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.map((row) => (
                <TableRow key={row.invoiceId}>
                  <TableCell>{row.invoiceId}</TableCell>
                  <TableCell align="right">
                    {new Date(row.date).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell align="right">{row.commission || "-"}</TableCell>
                  <TableCell align="right">
                    {`
                    ${row.amountHT
                      .toFixed(2)
                      .replace(/\B(?=(\d{3})+(?!\d))/g, " ")}\u202F€
                  `}
                  </TableCell>
                  <TableCell align="right">
                    {row.vat ? `${row.vat}%` : "-"}
                  </TableCell>
                  <TableCell align="right">
                    {`
                    ${Number(row.amountTTC)
                      .toFixed(2)
                      .replace(/B(?=(d{3})+(?!d))/g, " ")}
                    \u202F€
                  `}
                  </TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">
                    <Link to={`/accountant/invoice/${row.invoiceId}`}>
                      <RemoveRedEyeOutlinedIcon />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box>
          {rows?.map((row) => (
            <Paper
              key={row.invoiceId}
              sx={{
                marginBottom: "1rem",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
                border: "1px solid grey",
              }}
            >
              <Box>
                <strong>Numéro :</strong> {row.invoiceId}
              </Box>
              <Box>
                <strong>Date :</strong>{" "}
                {new Date(row.date).toLocaleDateString("fr-FR")}
              </Box>
              <Box>
                <strong>Commission :</strong> {row.commission || "-"}
              </Box>
              <Box>
                <strong>Montant HT :</strong>{" "}
                {row.amountHT.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Box>
              <Box>
                <strong>TVA :</strong> {row.vat ? `${row.vat}%` : "-"}
              </Box>
              <Box>
                <strong>Montant TTC :</strong>{" "}
                {row.amountTTC.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                }}
              >
                <strong>Détail :</strong>
                <Link
                  key={row.invoiceId}
                  to={`/accountant/invoice/${row.invoiceId}`}
                >
                  <RemoveRedEyeOutlinedIcon
                    sx={{ mt: "auto" }}
                  ></RemoveRedEyeOutlinedIcon>
                </Link>
              </Box>
              <Box>
                <strong>Status :</strong> {row.status}
              </Box>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default DisplayInvoicesForAccountant;
