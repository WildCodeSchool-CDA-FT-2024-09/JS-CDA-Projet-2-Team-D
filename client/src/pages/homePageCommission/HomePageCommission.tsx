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

// import React from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Chip,
//   CircularProgress,
// } from "@mui/material";
// import { useMediaQuery, useTheme } from "@mui/material";
// import { useQuery } from "@apollo/client";
// import { GET_INVOICE_BY_COMMISSION } from "../../schema/query";
// import BudgetGauge from "../../components/budgetGaugeChart/BudgetGaugeChart";

// const HomePageCommission = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down("md"));

//   // Paramètre pour la requête (remplace 1 par l'ID de la commission que tu veux tester)
//   const { loading, error, data } = useQuery(GET_INVOICE_BY_COMMISSION, {
//     variables: { commissionId: 1 },
//   });

//   if (loading) return <CircularProgress />;
//   if (error) return <Typography color="error">Erreur: {error.message}</Typography>;

//   // Transforme les données récupérées pour les utiliser dans ton tableau
//   const invoices = data.getInvoicesByCommissionId.map((invoice: any) => {
//     const vatRate = invoice.vat?.rate || 0; // Gère les cas où la TVA est absente
//     const ttc = invoice.price_without_vat + (invoice.price_without_vat * vatRate) / 100;
//     return {
//       id: invoice.id,
//       date: invoice.date,
//       label: invoice.label,
//       price_without_vat: invoice.price_without_vat,
//       vatRate,
//       ttc,
//       status: invoice.status?.label || "Inconnu",
//     };
//   });

//   const budgetActuel = invoices.reduce((sum, row) => sum + row.ttc, 0);
//   const budgetGlobal = 2500;

//   const getChipStyles = (status: string) => {
//     let backgroundColor;
//     switch (status) {
//       case "Validé":
//         backgroundColor = theme.palette.success.main;
//         break;
//       case "En attente":
//         backgroundColor = theme.palette.secondary.main;
//         break;
//       case "Refusé":
//         backgroundColor = theme.palette.error.main;
//         break;
//       default:
//         backgroundColor = theme.palette.primary.main;
//     }
//     return {
//       backgroundColor,
//       color: theme.palette.getContrastText(backgroundColor),
//       fontWeight: "bold",
//       fontSize: "14px",
//     };
//   };

//   return (
//     <Box sx={{ padding: 2 }}>
//       <Typography
//         variant="h4"
//         gutterBottom
//         sx={{ fontSize: isMobile ? "18px" : "24px", fontWeight: "bold" }}
//       >
//         Récapitulatif des Factures de Commission
//       </Typography>
//       <BudgetGauge budgetGlobal={budgetGlobal} budgetActuel={budgetActuel} />
//       <TableContainer component={Paper}>
//         <Table sx={{ tableLayout: "auto" }}>
//           <TableHead>
//             <TableRow>
//               <TableCell>
//                 {isMobile ? "N° de fact." : "Numéro de facture"}
//               </TableCell>
//               <TableCell>Date</TableCell>
//               <TableCell>Libellé</TableCell>
//               {!isMobile && <TableCell>Prix HT</TableCell>}
//               {!isMobile && <TableCell>Taux TVA</TableCell>}
//               <TableCell>Prix TTC</TableCell>
//               <TableCell>Status</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {invoices.map((row: any) => (
//               <TableRow key={row.id}>
//                 <TableCell>{row.id}</TableCell>
//                 <TableCell>{row.date}</TableCell>
//                 <TableCell>{row.label}</TableCell>
//                 {!isMobile && (
//                   <TableCell sx={{ whiteSpace: "nowrap" }}>
//                     {row.price_without_vat} €
//                   </TableCell>
//                 )}
//                 {!isMobile && (
//                   <TableCell sx={{ whiteSpace: "nowrap" }}>
//                     {row.vatRate}%
//                   </TableCell>
//                 )}
//                 <TableCell sx={{ whiteSpace: "nowrap" }}>{row.ttc} €</TableCell>
//                 <TableCell>
//                   <Chip
//                     label={isMobile ? row.status[0] : row.status}
//                     sx={getChipStyles(row.status)}
//                   />
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default HomePageCommission;
