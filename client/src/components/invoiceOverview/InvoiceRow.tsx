import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Invoice } from "../../types/graphql-types";
import { formatDate } from "../../utils/dateUtils";
import {
  Chip,
  TableCell,
  TableRow,
  useTheme,
  useMediaQuery,
  Modal,
  Typography,
  TableContainer,
  Table,
  TableBody,
  Button,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Link } from "@mui/material";
import Paper from "@mui/material/Paper";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  borderRadius: ".5em",
  boxShadow: 24,
  p: 4,
};

function InvoiceRow({ row }: { row: Invoice }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "1em" }}
          >
            Détail de la facture {row.invoiceNumber}
          </Typography>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableBody>
                <TableRow>
                  <TableCell align="left">Date :</TableCell>
                  <TableCell align="left">{formatDate(row.date)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Libellé :</TableCell>
                  <TableCell align="left">{row.label}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Montant T.T.C. :</TableCell>
                  <TableCell align="left">{row.amount_with_vat}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Montant H.T. :</TableCell>
                  <TableCell align="left">{row.price_without_vat}</TableCell>
                </TableRow>
                {row.info && (
                  <TableRow>
                    <TableCell align="left">
                      Informations complémentaires :
                    </TableCell>
                    <TableCell align="left">{row.info}</TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell align="left">Pièce justificative :</TableCell>
                  <TableCell align="left">
                    <Stack direction="row" spacing={2}>
                      <Link
                        href={`http://localhost:7100/upload/get-file/${row.receipt}`}
                        download={row.receipt}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <UploadFileTwoToneIcon />
                        {row.receipt}
                      </Link>
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Commission :</TableCell>
                  <TableCell align="left">{row.commission.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    Catégorie / Sous-catégorie :
                  </TableCell>
                  <TableCell align="left">
                    {row.subcategory.category.label} / {row.subcategory.label}{" "}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "1em",
            }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              startIcon={<CloseIcon />}
              size="small"
            >
              Fermer
            </Button>
          </Stack>
        </Box>
      </Modal>

      <TableRow key={row.id}>
        <TableCell>{row.invoiceNumber}</TableCell>
        <TableCell>{formatDate(row.date)}</TableCell>
        <TableCell>{row.label}</TableCell>
        {!isMobile && <TableCell>{row.commission?.name}</TableCell>}
        {!isMobile && <TableCell>{row.subcategory?.label}</TableCell>}
        <TableCell sx={{ whiteSpace: "nowrap" }}>
          {montantTTC.toFixed(2)} €
        </TableCell>
        <TableCell align="right">
          <RouterLink to="#" onClick={handleOpen}>
            <RemoveRedEyeOutlinedIcon />
          </RouterLink>
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
