import { useParams } from "react-router-dom";
import { useGetInvoiceByIdQuery } from "../../types/graphql-types";
import {
  TextField,
  Button,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  FormControl,
  RadioGroup,
  Radio,
  Snackbar,
  Alert,
  AlertTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fr from "date-fns/locale/fr";
// import { useState } from "react";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";

function DetailInvoice() {
  const { invoiceId } = useParams<{ invoiceId: string }>();

  // Conversion sécurisée de l'ID en nombre
  const invoiceIdAsNumber = invoiceId ? parseInt(invoiceId, 10) : NaN;
  const isInvalidId = isNaN(invoiceIdAsNumber);

  // Appeler le hook avec l'option `skip`
  const { loading, error, data } = useGetInvoiceByIdQuery({
    variables: { invoiceId: invoiceIdAsNumber }, // Passez l'ID converti en nombre
    // skip: isInvalidId, // Ignorez la requête si l'ID est invalide
  });

  // Gérer les cas où l'ID est invalide
  if (isInvalidId) {
    return <p>Invalid Invoice ID</p>;
  }

  // Gestion des différents états
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("GraphQL error:", error);
    return (
      <div>
        <p>Error :(</p>
        <p>{error.message}</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (!data?.getInvoiceById) {
    return <p>No data</p>;
  }

  const invoice = data.getInvoiceById;
  const totalPrice =
    invoice.price_without_vat * (1 + (invoice.vat?.rate ?? 0) / 100);

  return (
    <Paper
      elevation={3}
      style={{
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        Facture n°{invoice.id}
      </Typography>
      <Snackbar open={false} autoHideDuration={8000}>
        <Alert
          severity="error"
          variant="filled"
          sx={{
            backgroundColor: "#F03D3D",
            color: "black",
            fontWeight: "bold",
            fontSize: "1.25rem",
          }}
        >
          <AlertTitle>Erreur</AlertTitle>
          Veuillez remplir les champs obligatoires suivants :
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            <li>Champ requis</li>
          </ul>
        </Alert>
      </Snackbar>

      <form>
        <Grid container spacing={3}>
          <Grid size={6}>
            <TextField
              label="Commissions"
              fullWidth
              value={invoice.commission?.name || ""} // Affiche le nom de la commission ou une chaîne vide
              slotProps={{
                input: {
                  readOnly: true, // Rend le champ non modifiable
                },
              }}
            />
          </Grid>
          <Grid size={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={fr}
            >
              <DatePicker
                label="Date de la facture"
                format="eee dd MMMM yyyy"
                value={new Date(invoice.date)}
                slots={{
                  textField: (params) => <TextField {...params} fullWidth />,
                }}
              />
            </LocalizationProvider>
          </Grid>

          <Grid container size={12} alignItems="center" justifyContent="center">
            <Grid size={9}>
              <FormControl component="fieldset">
                <Typography>
                  <strong>Type de transaction</strong>
                </Typography>
                <RadioGroup
                  row
                  value={invoice.creditDebit?.id?.toString() || ""}
                >
                  <FormControlLabel
                    value="2"
                    control={<Radio />}
                    label="Crédit"
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Débit"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid size={3}>
              <FormControlLabel
                control={<Checkbox />}
                label="Payé"
                aria-live="polite"
                value={invoice.paid}
              />
            </Grid>
          </Grid>

          <Grid size={6}>
            <TextField label="Catégories" fullWidth value="category" />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Sous-catégories"
              fullWidth
              value={invoice.subcategory.label}
            />
          </Grid>
          <Grid size={6}>
            <TextField label="Libellé" fullWidth value={invoice.label} />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Prix HT"
              type="number"
              fullWidth
              value={invoice.price_without_vat}
            />
          </Grid>
          <Grid size={6}>
            <TextField label="Taux de TVA" fullWidth value={invoice.vat.rate} />
          </Grid>
          <Grid size={12}>
            <Typography variant="h6">
              Total TTC : <strong>{totalPrice}</strong>
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography>Justificatif</Typography>
            <a
              href={`http://localhost:7100/upload/get-file/${invoice.receipt}`}
              download
            >
              <UploadFileTwoToneIcon />
              Télécharger le justificatif
            </a>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Informations complémentaires"
              multiline
              rows={4}
              fullWidth
            />
          </Grid>
          <Grid size={12}>
            <Button type="submit" variant="contained" color="primary">
              Enregistrer la facture
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default DetailInvoice;
