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
  Stack,
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import BudgetGauge from "../../components/budgetGaugeChart/BudgetGaugeChart";
import {
  useGetInvoicesByCommissionIdQuery,
  useGetCurrentBudgetByCommissionIdQuery,
  useGetUserByIdQuery,
} from "../../types/graphql-types";
import { formatDate } from "../../utils/dateUtils";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import PageTitle from "../../components/PageTitle";
import SearchBar from "../../components/SearchBar";
import Pagination from "@mui/material/Pagination";

const HomePageCommission = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { commissionId } = useParams<{ commissionId: string }>();
  const commissionIdNumber = parseInt(commissionId || "0", 10);

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

  const { user } = useUser();
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetUserByIdQuery({
    variables: { userId: user?.id ?? 0 },
  });
  const commissions = userData?.getUserById.commissions || [];

  const currentCommission = commissions.find(
    (commission) => commission.id === commissionIdNumber,
  );

  const {
    data: budgetData,
    loading: budgetLoading,
    error: budgetError,
  } = useGetCurrentBudgetByCommissionIdQuery({
    variables: { commissionId: commissionIdNumber },
    skip: !commissionIdNumber,
  });

  const {
    data: invoiceData,
    loading: invoiceLoading,
    error: invoiceError,
  } = useGetInvoicesByCommissionIdQuery({
    variables: {
      commissionId: commissionIdNumber,
      limit: limit,
      offset: offset,
    },
    skip: !commissionIdNumber,
  });

  if (budgetLoading || invoiceLoading || userLoading)
    return <Typography>Chargement des données...</Typography>;

  if (budgetError || invoiceError || userError)
    return (
      <Typography>
        {budgetError?.message || invoiceError?.message || userError?.message}
      </Typography>
    );

  const formatAmount = (amount: number): number => {
    return Number(amount.toFixed(2));
  };

  const globalBudget = formatAmount(
    budgetData?.getCurrentBudgetByCommissionID?.amount || 0,
  );
  const currentBudget = formatAmount(
    invoiceData?.getInvoicesByCommissionId?.totalAmount || 0,
  );
  const invoices = invoiceData?.getInvoicesByCommissionId.invoices || [];
  const totalCount = invoiceData?.getInvoicesByCommissionId?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.invoiceNumber.toString().includes(searchQuery) ||
      invoice.label.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const getChipStyles = (status: string) => {
    const statusColors = {
      Validé: theme.palette.success.main,
      "En attente": theme.palette.warning.main,
      Refusé: theme.palette.error.main,
    };

    const backgroundColor =
      statusColors[status as keyof typeof statusColors] ||
      theme.palette.primary.main;

    return {
      backgroundColor,
      color: theme.palette.getContrastText(backgroundColor),
      fontWeight: "bold",
      fontSize: "14px",
    };
  };

  return (
    <Box sx={{ padding: 2 }}>
      <PageTitle
        title={`Récapitulatif des factures de la commission ${currentCommission?.name}`}
      />

      <BudgetGauge globalBudget={globalBudget} currentBudget={currentBudget} />

      <Box sx={{ marginBottom: 2 }}>
        <SearchBar
          placeholder="Rechercher une facture"
          value={searchQuery}
          onSearch={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                {isMobile ? "N° de fact." : "Numéro de facture"}
              </TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Libellé</TableCell>
              {!isMobile && <TableCell>Montant HT</TableCell>}
              {!isMobile && <TableCell>Taux TVA</TableCell>}
              <TableCell>Montant TTC</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInvoices.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isMobile ? 5 : 7} align="center">
                  Aucune facture disponible
                </TableCell>
              </TableRow>
            ) : (
              filteredInvoices.map((row) => {
                const montantHT =
                  row.creditDebit?.id === 2 //crédit
                    ? row.price_without_vat
                    : -row.price_without_vat;

                const montantTTC =
                  row.creditDebit?.id === 2 //crédit
                    ? row.amount_with_vat
                    : -row.amount_with_vat;

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
              })
            )}
          </TableBody>
        </Table>

        {invoices.length > 0 && (
          <Stack
            spacing={2}
            sx={{
              margin: "1em 0",
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
        )}
      </TableContainer>
    </Box>
  );
};

export default HomePageCommission;
