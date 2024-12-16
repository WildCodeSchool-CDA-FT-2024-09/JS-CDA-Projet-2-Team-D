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
import { useGetInvoicesByCommissionIdQuery } from "../../types/graphql-types";
import { formatDate } from "../../utils/dateUtils";
import { useState } from "react";

const HomePageCommission = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // État pour gérer la pagination
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(5); // Nombre d'éléments par page
  const offset = (page - 1) * limit;

  // Gestion du changement de page
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value);
  };

  // Appel de la requête GraphQL avec les paramètres donnés
  const { data, loading, error } = useGetInvoicesByCommissionIdQuery({
    variables: {
      commissionId: 4,
      limit: limit,
      offset: offset,
    },
  });

  // Gestion des états de chargement et d'erreur
  if (loading) return <Typography>Chargement des factures...</Typography>;
  if (error)
    return (
      <Typography>
        Erreur lors de la récupération des factures : {error.message}
      </Typography>
    );

  // Extraction des données depuis la réponse GraphQL
  const invoices = data?.getInvoicesByCommissionId.invoices || [];
  const totalCount = data?.getInvoicesByCommissionId?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / limit);

  const budgetActuel = invoices.reduce(
    (sum, row) => sum + (row.price_without_vat || 0),
    0,
  );
  const budgetGlobal = 4000;

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
      <BudgetGauge budgetGlobal={budgetGlobal} budgetActuel={budgetActuel} />
      <TableContainer component={Paper}>
        <Table sx={{ tableLayout: "auto" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                {isMobile ? "N° de fact." : "Numéro de facture"}
              </TableCell>{" "}
              <TableCell>Date</TableCell>
              <TableCell>Libellé</TableCell>
              {!isMobile && <TableCell>Prix HT</TableCell>}
              {!isMobile && <TableCell>Taux TVA</TableCell>}
              <TableCell>Prix TTC</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.invoiceNumber}</TableCell>
                <TableCell>{formatDate(row.date)}</TableCell>
                <TableCell>{row.label}</TableCell>
                {!isMobile && (
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {row.price_without_vat} €
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {row.vat?.rate}%
                  </TableCell>
                )}
                <TableCell sx={{ whiteSpace: "nowrap" }}>
                  {row.price_without_vat * (1 + (row.vat?.rate || 0) / 100)} €
                </TableCell>
                <TableCell>
                  <Chip
                    label={isMobile ? row.status?.label[0] : row.status?.label}
                    sx={getChipStyles(row.status?.label)}
                  />
                </TableCell>
              </TableRow>
            ))}
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
