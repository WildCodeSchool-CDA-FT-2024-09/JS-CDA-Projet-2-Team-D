import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetInvoiceByIdQuery,
  useUpdateStatusInvoiceMutation,
  useAssociateBankAccountToInvoiceMutation,
  useGetBanksQuery,
  Bank,
  useUpdateBalanceMutation,
  useRejectInvoiceMutation,
} from "../../types/graphql-types";
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
  Modal,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import fr from "date-fns/locale/fr";
import UploadFileTwoToneIcon from "@mui/icons-material/UploadFileTwoTone";
import AddBankAccount from "../../components/addBankAccount/AddBankAccount";
import useNotification from "../../hooks/useNotification";
import { Box } from "@mui/system";

function DetailInvoice() {
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotification();
  const { invoiceId } = useParams<{ invoiceId: string }>();

  const invoiceIdAsNumber = invoiceId ? parseInt(invoiceId, 10) : NaN;
  const isInvalidId = isNaN(invoiceIdAsNumber);

  const { loading, error, data } = useGetInvoiceByIdQuery({
    variables: { invoiceId: invoiceIdAsNumber },
  });

  const [selectedBank, setSelectedBank] = useState<string | "">("");
  const [banks, setBanks] = useState<Bank[]>([]);

  const [
    associateBankAccountToInvoice,
    { loading: loadingAssociate, error: errorAssociate },
  ] = useAssociateBankAccountToInvoiceMutation();

  const [updateStatusInvoiceMutation, { error: updateError }] =
    useUpdateStatusInvoiceMutation();

  const [updateBalanceMutation, { error: updateBalanceError }] =
    useUpdateBalanceMutation();

  const [rejectInvoiceMutation, { error: rejectInvoiceError }] =
    useRejectInvoiceMutation();

  const [open, setOpen] = useState(false);

  const [reason, setReason] = useState("");

  const { data: bankData } = useGetBanksQuery();
  useEffect(() => {
    if (bankData?.getBanks) {
      setBanks(bankData.getBanks);
    }
  }, [bankData]);

  if (loadingAssociate) {
    return <p>Loading...</p>;
  }

  if (errorAssociate) {
    console.error("GraphQL error: ", errorAssociate);
    return (
      <div>
        <p>Error :(</p>
        <pre>{JSON.stringify(errorAssociate, null, 2)}</pre>
      </div>
    );
  }

  if (updateError) {
    console.error("GraphQL error: ", updateError);
    return (
      <div>
        <p>Error :(</p>
        <pre>{JSON.stringify(updateError, null, 2)}</pre>
      </div>
    );
  }
  if (updateBalanceError) {
    return (
      <div>
        <p>Error :(</p>
        <pre>{JSON.stringify(updateBalanceError, null, 2)}</pre>
      </div>
    );
  }
  if (isInvalidId) {
    return <p>Invalid Invoice ID</p>;
  }

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

  if (rejectInvoiceError) {
    return (
      <div>
        <p>Error :(</p>
        <pre>{JSON.stringify(rejectInvoiceError, null, 2)}</pre>
      </div>
    );
  }

  const invoice = data.getInvoiceById;

  const handleValidateInvoice = async () => {
    const selectedBankAccount = banks?.find(
      (bank) => String(bank.id) === selectedBank,
    )?.bankAccounts?.[0];

    const bankAccountId = selectedBankAccount?.id
      ? Number(selectedBankAccount.id)
      : null;

    if (!bankAccountId) {
      notifyError("Veuillez sélectionner un compte bancaire valide");
      return;
    }

    try {
      await associateBankAccountToInvoice({
        variables: {
          invoiceId: invoice.id,
          bankAccountId,
        },
      });

      await updateStatusInvoiceMutation({
        variables: {
          invoiceId: invoice.id,
          statusId: 1,
        },
      });

      await updateBalanceMutation({
        variables: {
          bankAccountId,
          amount: totalPrice,
        },
      });

      notifySuccess(
        "Facture validée avec succès, compte bancaire associé et balance mise à jour",
      );
      navigate("/accountant");
    } catch {
      notifyError("Erreur lors de la validation de la facture");
    }
  };

  let totalPrice = 0;

  if (invoice.creditDebit?.id === 1) {
    totalPrice = -invoice.price_without_vat * (1 + invoice.vat.rate / 100);
  } else if (invoice.creditDebit?.id === 2) {
    totalPrice = invoice.price_without_vat * (1 + invoice.vat.rate / 100);
  } else {
    totalPrice = 0;
  }

  const handleRejectInvoice = async () => {
    try {
      const response = await rejectInvoiceMutation({
        variables: {
          invoiceId: invoice.id,
          reason,
        },
      });
      if (response.data?.rejectInvoice.reason) {
        notifySuccess("Facture refusée avec succès et email envoyé");
      } else {
        notifySuccess(
          "Facture refusée avec succès, mais l'email n'a pas pu être envoyé",
        );
      }

      navigate("/accountant");
    } catch {
      notifyError("Erreur lors du refus de la facture");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addAReason = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setReason(e.target.value);
  };

  const apiURL = import.meta.env.VITE_API_URL_UPLOAD;

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
        Facture n°{invoice.invoiceNumber}
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
              value={invoice.commission?.name || ""}
              slotProps={{
                input: {
                  readOnly: true,
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
            <TextField
              label="Catégories"
              fullWidth
              value={invoice.subcategory.category.label}
            />
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
              type="text"
              fullWidth
              value={`${invoice.price_without_vat}\u202F€`}
            />
          </Grid>
          <Grid
            size={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "2rem",
            }}
          >
            <Grid container>
              <TextField
                label="Taux de TVA"
                fullWidth
                value={`${invoice.vat.rate}\u202F%`}
              />
            </Grid>
          </Grid>

          <Grid
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: "1rem",
            }}
          >
            <Grid
              container
              sx={{
                display: "flex",
                alignItems: "center",
                mt: 2,
                border: "1px solid black",
                padding: "1rem",
                justifyContent: "center",
                width: "50%",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Total TTC : <strong>{`${totalPrice.toFixed(2)}\u202F€`}</strong>
              </Typography>
            </Grid>
          </Grid>
          <Grid size={12}>
            <Typography>Justificatif</Typography>
            <a
              href={`${apiURL}/upload/get-file/${invoice.receipt}`}
              download={invoice.receipt}
              style={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <UploadFileTwoToneIcon style={{ marginBottom: "6px" }} />
              Télécharger le justificatif
            </a>
          </Grid>
          <Grid size={12}>
            <TextField
              label="Informations complémentaires"
              multiline
              rows={4}
              fullWidth
              value={invoice.info}
            />
          </Grid>
          <Grid size={12}>
            <AddBankAccount
              invoiceId={invoice.id}
              selectedBank={selectedBank}
              setSelectedBank={setSelectedBank}
              banks={banks}
            />
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Button
                type="button"
                variant="contained"
                color="success"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
                onClick={() => handleValidateInvoice()}
              >
                Valider la facture
              </Button>
              <Button
                type="button"
                variant="contained"
                color="error"
                sx={{ fontWeight: "bold", fontSize: "1rem" }}
                onClick={handleOpen}
              >
                Refuser la facture
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 500,
                    bgcolor: "background.paper",
                    border: "2px solid #000",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h6" component="h2">
                    Ajoutez une raison pour ce refus
                  </Typography>
                  <TextField
                    fullWidth
                    label="Raison du refus"
                    type="email"
                    variant="outlined"
                    margin="normal"
                    multiline
                    rows={4}
                    onChange={(e) => addAReason(e)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleRejectInvoice()}
                    sx={{ mt: 2 }}
                  >
                    Envoyer l'email
                  </Button>
                </Box>
              </Modal>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default DetailInvoice;
