import { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Paper,
  Typography,
  SelectChangeEvent,
  Checkbox,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import BtnUpload from "../../components/BtnUpload";
import FormSelect from "../../components/form/FormSelect";
import FormTextField from "../../components/form/FormTextField";
import { FormSelectVat, Invoice } from "../../components/form/FormSelectVat";
import {
  InvoiceState,
  initialValues,
  isValidInvoice,
} from "../../types/InvoiceInputType";
import { useGetVatsQuery } from "../../types/graphql-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale";
import { useUser } from "../../hooks/useUser";

const InvoiceForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();
  const userId = user?.id;
  const [creditDebitType, setCreditDebitType] = useState<number>(0);

  const handleCreditDebitChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value);
    setCreditDebitType(value);
    setInvoice((prevState) => ({
      ...prevState,
      credit_debit_id: value,
      // Reset the category when changing credit/debit type
      category_id: 0,
      subcategory_id: 0,
    }));
  };

  const {
    data: vatRatesData,
    loading: loadingVatRates,
    error: vatRatesError,
  } = useGetVatsQuery();

  const [invoice, setInvoice] = useState<InvoiceState>({
    ...initialValues,
    user_id: userId ?? null,
  });

  const handleFileUpload = (file: File | null) => {
    setInvoice((prevState) => ({
      ...prevState,
      receipt: file,
    }));
  };

  const handleInvoiceChange = (
    event:
      | SelectChangeEvent<string | number>
      | React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    options?: number,
  ) => {
    const { name, value, files } = event.target as HTMLInputElement;

    if (files && files.length > 0) {
      setInvoice((prevState) => ({
        ...prevState,
        [name]: files[0], // Adds the uploaded file
      }));
    } else if (name === "price_without_vat" || name === "vat_id") {
      setInvoice((prevState) => ({
        ...prevState,
        [name]: value ? +value : 0,
      }));
    } else if (name === "category_id" && options) {
      setInvoice((prevState) => ({
        ...prevState,
        [name]: +value as number,
        credit_debit_id: options, // Update credit/debit id
      }));
    } else if (name === "paid") {
      setInvoice((prevState) => ({
        ...prevState,
        [name]: !prevState.paid,
      }));
    } else if (name === "label" || name === "info") {
      setInvoice((prevState) => ({
        ...prevState,
        [name]: value || "",
      }));
    } else {
      setInvoice((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setInvoice((prevState) => ({
      ...prevState,
      date: date || new Date(),
    }));
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (userId) {
      setInvoice((prevState) => ({ ...prevState, user_id: userId }));
    }
    console.info("Données de la facture :", invoice);

    // Checks of mandatory fields
    const missingFields: string[] = [];
    if (!invoice.commission_id) missingFields.push("Commissions");
    if (!invoice.date) missingFields.push("Date de la facture");
    if (!invoice.category_id) missingFields.push("Catégories");
    if (!invoice.subcategory_id) missingFields.push("Sous-catégories");
    if (!invoice.label) missingFields.push("Libellé");
    if (!invoice.price_without_vat) missingFields.push("Prix HT");
    if (!invoice.vat_id) missingFields.push("Taux de TVA");
    if (!invoice.receipt) missingFields.push("Justificatif");

    if (missingFields.length > 0) {
      alert(
        `Veuillez remplir les champs obligatoires suivants :\n- ${missingFields.join("\n- ")}`,
      );
      setIsSubmitting(false);
      return;
    }

    try {
      if (!userId) {
        throw new Error("Utilisateur non connecté");
      }

      setInvoice((prevState) => ({ ...prevState, user_id: userId }));

      if (!isValidInvoice(invoice, userId)) {
        throw new Error("Veuillez remplir tous les champs obligatoires");
      }
      const formData = new FormData();
      formData.append("statusId", invoice.status_id.toString());
      formData.append("vatId", invoice.vat_id.toString());
      formData.append("creditDebitId", invoice.credit_debit_id.toString());
      formData.append("subcategoryId", invoice.subcategory_id.toString());
      formData.append("commissionId", invoice.commission_id.toString());
      formData.append("userId", userId.toString());
      formData.append(
        "price_without_vat",
        invoice.price_without_vat.toString(),
      );
      formData.append("receipt", invoice.receipt);
      formData.append("label", invoice.label);
      formData.append("info", invoice.info);
      formData.append("paid", invoice.paid ? "1" : "0");
      formData.append("date", invoice.date.toISOString());
      formData.append("category_id", invoice.category_id.toString());
      formData.append("invoice_id", invoice.invoice_id ?? ""); // optional field
      formData.append("total", invoice.total.toString());
      formData.append("bankAccountId", ""); // optional field

      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.info("Réponse du serveur :", response.data);
      alert("Facture envoyée avec succès !");

      resetForm();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erreur lors de l'envoi :", error.message);
      } else {
        console.error("Erreur inconnue :", error);
        alert("Échec de l'envoi de la facture.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setInvoice({ ...initialValues });
  };

  const loading = loadingVatRates;
  const error = vatRatesError;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {vatRatesError?.message}</Typography>;
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
    >
      <Typography variant="h5" gutterBottom align="center" sx={{ mb: 4 }}>
        Nouvelle Facture
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={6}>
            <FormSelect
              name="commission_id"
              property="name"
              label="Commissions"
              value={invoice.commission_id ?? ""}
              handleSelect={handleInvoiceChange}
              required
            />
          </Grid>
          <Grid size={6}>
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={fr}
            >
              <DatePicker
                label="Date de la facture"
                value={invoice.date}
                name="date"
                onChange={handleDateChange}
                format="eee dd MMMM yyyy"
                slots={{
                  textField: (params) => <TextField {...params} fullWidth />,
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid size={12}>
            <FormControl component="fieldset">
              <Typography>Type de transaction</Typography>
              <RadioGroup
                row
                name="credit-debit-type"
                value={creditDebitType.toString()}
                onChange={handleCreditDebitChange}
              >
                <FormControlLabel
                  value="1"
                  control={<Radio />}
                  label="Crédit"
                />
                <FormControlLabel value="2" control={<Radio />} label="Débit" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* N'afficher les catégories que si un type crédit/débit est sélectionné */}
          {creditDebitType !== 0 && (
            <>
              <Grid size={6}>
                <FormSelect
                  name="category_id"
                  label="Catégories"
                  property="label"
                  value={invoice.category_id ?? ""}
                  handleSelect={handleInvoiceChange}
                  creditDebitId={creditDebitType}
                  required
                />
              </Grid>

              {invoice.category_id !== 0 && (
                <Grid size={6}>
                  <FormSelect
                    name="subcategory_id"
                    label="Sous-catégories"
                    property="label"
                    value={invoice.subcategory_id?.toString() ?? ""}
                    subValue={invoice.category_id ?? undefined}
                    handleSelect={handleInvoiceChange}
                    required
                  />
                </Grid>
              )}
            </>
          )}
          <FormTextField
            name="label"
            label="Libellé"
            value={invoice.label || ""}
            onChange={handleInvoiceChange}
            required={true}
            error={invoice.label.length === 0}
            helperText={invoice.label.length === 0 ? "Ce champ est requis" : ""}
          />
          <Grid size={6}>
            <FormTextField
              name="price_without_vat"
              label="Prix HT"
              type="number"
              value={invoice.price_without_vat.toString()}
              onChange={handleInvoiceChange}
              required={true}
              error={invoice.price_without_vat === 0}
              helperText={
                invoice.price_without_vat === 0 ? "Ce champ est requis" : ""
              }
            />
          </Grid>
          <Grid size={6}>
            <FormSelectVat
              name="vat_id"
              label="Taux de TVA"
              value={invoice.vat_id?.toString()}
              onChange={handleInvoiceChange}
              options={vatRatesData?.getVats || []}
              priceWithoutVat={invoice.price_without_vat}
              setInvoice={
                setInvoice as React.Dispatch<React.SetStateAction<Invoice>>
              }
            />
          </Grid>
          <Grid
            size={6}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={invoice.paid}
                  onChange={(e) => handleInvoiceChange(e)}
                  name="paid"
                  aria-checked={invoice.paid ? "true" : "false"}
                />
              }
              label="Payé"
              aria-live="polite"
            />
          </Grid>
          <Grid
            size={12}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="h6">
              Total TTC :{" "}
              {invoice.category_id && invoice.category_id !== 0 ? (
                <>
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        invoice.credit_debit_id === 1 ? "#6EBF8B" : "#E21818",
                    }}
                  >
                    {invoice.credit_debit_id === 1 ? "+" : "-"}
                  </span>
                  {(invoice.total || 0).toFixed(2)} €
                  <span
                    style={{
                      fontWeight: "bold",
                      color:
                        invoice.credit_debit_id === 1 ? "#6EBF8B" : "#E21818",
                      marginLeft: "5px",
                    }}
                  >
                    ({invoice.credit_debit_id === 1 ? "crédit" : "débit"})
                  </span>
                </>
              ) : (
                ""
              )}
            </Typography>
          </Grid>
          <Grid
            size={12}
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Typography>Justificatif</Typography>
            <BtnUpload onFileChange={handleFileUpload} />
            {invoice.receipt && (
              <Typography variant="body2" color="textSecondary">
                {invoice.receipt.name}
              </Typography>
            )}
          </Grid>
          <Grid size={12}>
            <FormTextField
              name="info"
              label="Informations complémentaires"
              value={invoice.info}
              onChange={handleInvoiceChange}
              multiline
              rows={4}
              aria-live="polite"
              required={false}
            />
          </Grid>
          <Grid size={12} container alignItems="center" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Envoi en cours..." : "Enregistrer la facture"}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
export default InvoiceForm;
