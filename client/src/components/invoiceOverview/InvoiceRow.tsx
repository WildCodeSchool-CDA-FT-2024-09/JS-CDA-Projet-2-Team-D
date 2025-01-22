import { Invoice } from "../../types/graphql-types";
import { formatDate } from "../../utils/dateUtils";
import {
  Chip,
  TableCell,
  TableRow,
  useTheme,
  useMediaQuery,
} from "@mui/material";

function InvoiceRow({ row }: { row: Invoice }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

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

  const montantTTC =
    row.creditDebit?.label?.toLowerCase() === "débit"
      ? -row.amount_with_vat
      : row.amount_with_vat;

  return (
    <>
      <TableRow key={row.id}>
        <TableCell>{row.invoiceNumber}</TableCell>
        <TableCell>{formatDate(row.date)}</TableCell>
        <TableCell>{row.label}</TableCell>
        {!isMobile && <TableCell>{row.commission?.name}</TableCell>}
        {!isMobile && <TableCell>{row.subcategory?.label}</TableCell>}
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {montantTTC.toFixed(2)} €
        </TableCell>
        <TableCell>
          <Chip
            label={isMobile ? row.status?.label[0] : row.status?.label}
            sx={getChipStyles(row.status?.label)}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

export default InvoiceRow;
