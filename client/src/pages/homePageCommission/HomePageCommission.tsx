import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Pagination,
  Stack,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import BudgetGauge from "../../components/budgetGaugeChart/BudgetGaugeChart";
import {
  useGetInvoicesByCommissionIdQuery,
  useGetCurrentBudgetByCommissionIdQuery,
} from "../../types/graphql-types";
import { formatDate } from "../../utils/dateUtils";
import { useState } from "react";

const HomePageCommission = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5);
  const offset = (page - 1) * limit;

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  const {
    data: budgetData,
    loading: budgetLoading,
    error: budgetError,
  } = useGetCurrentBudgetByCommissionIdQuery({
    variables: { commissionId: 4 },
  });

  const {
    data: invoiceData,
    loading: invoiceLoading,
    error: invoiceError,
  } = useGetInvoicesByCommissionIdQuery({
    variables: {
      commissionId: 4,
      limit: limit,
      offset: offset,
    },
  });

  if (budgetLoading || invoiceLoading)
    return <Typography>Chargement des données...</Typography>;

  if (budgetError || invoiceError)
    return (
      <Typography>
        Erreur : {budgetError?.message || invoiceError?.message}
      </Typography>
    );

  const globalBudget = budgetData?.getCurrentBudgetByCommissionID?.amount || 0;
  const currentBudget =
    invoiceData?.getInvoicesByCommissionId?.totalAmount || 0;
  const invoices = invoiceData?.getInvoicesByCommissionId.invoices || [];
  const totalCount = invoiceData?.getInvoicesByCommissionId?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const getChipStyles = (status: string) => {
    let backgroundColor;
    switch (status) {
      case "Validé":
        backgroundColor = theme.palette.success.main;
        break;
      case "En attente":
        backgroundColor = theme.palette.warning.main;
        break;
      case "Refusé":
        backgroundColor = theme.palette.error.main;
        break;
      default:
        backgroundColor = theme.palette.primary.main;
    }
    return {
      backgroundColor,
      color: theme.palette.getContrastText(backgroundColor),
      fontWeight: "bold",
      fontSize: "14px",
    };
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontSize: isMobile ? "18px" : "24px", fontWeight: "bold" }}
      >
        Récapitulatif des Factures de Commission
      </Typography>
      <BudgetGauge globalBudget={globalBudget} currentBudget={currentBudget} />
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                {isMobile ? "N° de fact." : "Numéro de facture"}
              </TableCell>{" "}
              <TableCell>Date</TableCell>
              <TableCell>Libellé</TableCell>
              {!isMobile && <TableCell>Montant HT</TableCell>}
              {!isMobile && <TableCell>Taux TVA</TableCell>}
              <TableCell>Montant TTC</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((row) => {
              // Ajustement des montants HT et TTC en fonction du type (Débit ou Crédit)
              const montantHT =
                row.creditDebit?.label?.toLowerCase() === "débit"
                  ? -row.price_without_vat
                  : row.price_without_vat;

              const montantTTC =
                row.creditDebit?.label?.toLowerCase() === "débit"
                  ? -row.price_without_vat * (1 + (row.vat?.rate || 0) / 100)
                  : row.price_without_vat * (1 + (row.vat?.rate || 0) / 100);

              return (
                <TableRow key={row.id}>
                  <TableCell>{row.invoiceNumber}</TableCell>
                  <TableCell>{formatDate(row.date)}</TableCell>
                  <TableCell>{row.label}</TableCell>
                  {!isMobile && (
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {montantHT.toFixed(2)} €
                    </TableCell>
                  )}
                  {!isMobile && (
                    <TableCell sx={{ whiteSpace: "nowrap" }}>
                      {row.vat?.rate || 0}%
                    </TableCell>
                  )}
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {montantTTC.toFixed(2)} €
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={
                        isMobile ? row.status?.label[0] : row.status?.label
                      }
                      sx={getChipStyles(row.status?.label)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Stack
          spacing={2}
          sx={{
            marginBottom: "1em",
            marginTop: "1em",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </TableContainer>
    </Box>
  );
};

export default HomePageCommission;
