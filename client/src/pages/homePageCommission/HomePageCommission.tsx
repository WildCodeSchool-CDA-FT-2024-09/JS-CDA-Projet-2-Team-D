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
} from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import BudgetGauge from "../../components/budgetGaugeChart/BudgetGaugeChart";

const data = [
  {
    id: 1,
    price_without_vat: 400,
    label: "essence",
    vatRate: 20,
    ttc: 480,
    status: "Validé",
    date: "2024/12/01",
  },
  {
    id: 2,
    price_without_vat: 50,
    label: "cigarette",
    vatRate: 10,
    ttc: 55,
    status: "Refusé",
    date: "2024/12/02",
  },
  {
    id: 3,
    price_without_vat: 60,
    label: "chaussure",
    vatRate: 5,
    ttc: 63,
    status: "En attente",
    date: "2024/12/03",
  },
  {
    id: 4,
    price_without_vat: 500,
    label: "chocolat",
    vatRate: 20,
    ttc: 600,
    status: "Validé",
    date: "2024/12/04",
  },
  {
    id: 5,
    price_without_vat: 30,
    label: "bijoux",
    vatRate: 10,
    ttc: 33,
    status: "Refusé",
    date: "2024/12/05",
  },
  {
    id: 6,
    price_without_vat: 600,
    label: "Lego",
    vatRate: 5,
    ttc: 630,
    status: "En attente",
    date: "2024/12/06",
  },
];

const HomePageCommission = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const budgetActuel = data.reduce((sum, row) => sum + row.ttc, 0);
  const budgetGlobal = 2500;

  const getChipStyles = (status: string) => {
    let backgroundColor;
    switch (status) {
      case "Validé":
        backgroundColor = theme.palette.success.main;
        break;
      case "En attente":
        backgroundColor = theme.palette.secondary.main;
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
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.label}</TableCell>
                {!isMobile && (
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {row.price_without_vat} €
                  </TableCell>
                )}
                {!isMobile && (
                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {row.vatRate}%
                  </TableCell>
                )}
                <TableCell sx={{ whiteSpace: "nowrap" }}>{row.ttc} €</TableCell>
                <TableCell>
                  <Chip
                    label={isMobile ? row.status[0] : row.status}
                    sx={getChipStyles(row.status)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default HomePageCommission;
