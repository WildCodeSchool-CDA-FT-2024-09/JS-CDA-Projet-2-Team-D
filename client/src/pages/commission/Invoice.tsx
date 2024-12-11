import React, { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  SelectChangeEvent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import BtnUpload from "../../components/BtnUpload";
import { Formik } from "formik";

import FormSelect from "../../components/FormSelect";
import FormTextField from "../../components/FormTextField";
import FormSelectVat from "../../components/FormSelectVat";
import {
  InvoiceState,
  initialValues,
  invoiceValidationSchema,
} from "../../types/InvoiceInputType";
import {
  useGetVatsQuery,
  useGetCategoriesQuery,
  useGetCommissionsQuery,
} from "../../types/graphql-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { fr } from "date-fns/locale";

const InvoiceForm: React.FC = () => {
  const {
    data: categoriesData,
    loading: loadingCategories,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const {
    data: vatRatesData,
    loading: loadingVatRates,
    error: vatRatesError,
  } = useGetVatsQuery();

  const {
    data: commissionsData,
    loading: loadingCommissions,
    error: commissionsError,
  } = useGetCommissionsQuery();

  const [invoice, setInvoice] = useState<InvoiceState>(initialValues);

  const handleFileUpload = (file: File | null) => {
    setInvoice((prevState) => ({
      ...prevState,
      receipt: file,
    }));
  };

  const handleChange = (
    event:
      | SelectChangeEvent<string>
      | React.ChangeEvent<
          | HTMLInputElement
          | HTMLTextAreaElement
          | { name?: string; value: unknown }
        >,
  ) => {
    const { name, value } = event.target;
    if (!name) return;

    const parsedValue = [
      "price_without_vat",
      "vat_id",
      "commission_id",
      "category_id",
      "subcategory_id",
      "credit_debit_id",
    ].includes(name)
      ? Number(value)
      : value;

    // Management of the specific logic for "price_without_vat" or "vat_id"
    if (name === "price_without_vat" || name === "vat_id") {
      const ht =
        name === "price_without_vat"
          ? typeof parsedValue === "number"
            ? parsedValue
            : 0
          : invoice.price_without_vat;

      if (!vatRatesData?.getVats) {
        console.error("Les données de taux de TVA ne sont pas disponibles.");
        return;
      }

      const selectedVAT = vatRatesData.getVats.find(
        (vat) => vat.id === (name === "vat_id" ? parsedValue : invoice.vat_id),
      );

      if (!selectedVAT) {
        console.error("Aucun taux de TVA trouvé pour cet ID");
        return;
      }

      const vatRate = selectedVAT.rate || 0;
      const totalTTC = ht + (ht * vatRate) / 100;

      setInvoice((prevState) => ({
        ...prevState,
        [name]: parsedValue,
        total: totalTTC,
      }));
    } else if (name === "category_id") {
      setInvoice((prevState) => ({
        ...prevState,
        [name]: parsedValue as number,
        credit_debit_id: getCreditDebitId(parsedValue as number),
      }));
    } else {
      setInvoice((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
    }
  };

  // Function to obtain credit/debit ID based on category
  const getCreditDebitId = (categoryId: number): number => {
    const selectedCategory = categoriesData?.getCategories.find(
      (category) => category.id === categoryId,
    );
    return selectedCategory?.creditDebit?.id || invoice.credit_debit_id;
  };

  const handleDateChange = (date: Date | null) => {
    setInvoice((prevState) => ({
      ...prevState,
      date: date || new Date(),
    }));
  };

  const handleSubmit = async (values: InvoiceState) => {
    console.info("Données du formulaire :", values);

    console.info("Form data:", invoice);
    //  Prepare the input object based on the current state
    // const input = {
    //   commission_id: invoice.commission_id,
    //   date: invoice.date,
    //   category_id: invoice.category_id,
    //   subcategory_id: invoice.subcategory_id,
    //   invoice_id: invoice.invoice_id,
    //   label: invoice.label,
    //   credit_debit_id: invoice.credit_debit_id,
    //   price_without_vat: invoice.price_without_vat,
    //   vat_id: invoice.vat_id,
    //   receipt: invoice.receipt,
    //   paid: invoice.paid,
    //   info: invoice.info,
    //   status_id: invoice.status_id,
    //   user_id: invoice.user_id,
  };

  // try {
  //   const response = await createInvoice({ variables: { input } });
  //   console.info("Invoice created:", response.data.setInvoice);
  // } catch (error) {
  //   console.error("Error creating invoice:", error);
  // }

  const loading = loadingCategories || loadingVatRates || loadingCommissions;
  const error = categoriesError || vatRatesError || commissionsError;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography>
        Error:{" "}
        {categoriesError?.message ||
          vatRatesError?.message ||
          commissionsError?.message}
      </Typography>
    );
  }

  return (
    <Paper
      elevation={3}
      style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Facture
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={invoiceValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors }) => (
          <form>
            <Grid container spacing={3}>
              <Grid size={6}>
                <FormSelect
                  name="commission_id"
                  label="Commissions"
                  value={invoice.commission_id.toString()}
                  onChange={handleChange}
                  options={commissionsData?.getCommissions || []}
                  error={errors["commission_id"]}
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
                    onChange={handleDateChange}
                    format="eee dd MMMM yyyy"
                    slots={{
                      textField: (params) => (
                        <TextField {...params} fullWidth />
                      ),
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid size={6}>
                <FormSelect
                  name="category_id"
                  label="Catégories"
                  value={invoice.category_id.toString()}
                  onChange={handleChange}
                  options={categoriesData?.getCategories || []}
                  error={errors["category_id"]}
                />
              </Grid>
              <Grid size={6}>
                <FormSelect
                  name="subcategory_id"
                  label="Sous-catégories"
                  value={invoice.subcategory_id.toString()}
                  onChange={handleChange}
                  options={
                    categoriesData?.getCategories.find(
                      (category) => category.id === invoice.category_id,
                    )?.subcategories || []
                  }
                  error={errors["subcategory_id"]}
                />
              </Grid>
              <FormTextField name="label" label="Libellé" />
              <Grid size={6}>
                <FormTextField
                  name="price_without_vat"
                  label="Prix HT"
                  type="number"
                  value={
                    invoice.price_without_vat === 0
                      ? ""
                      : invoice.price_without_vat
                  }
                  onChange={handleChange}
                  inputProps={{ min: 0 }}
                  error={!!errors["price_without_vat"]}
                  helperText={errors["price_without_vat"]}
                />
              </Grid>
              <Grid size={6}>
                <FormSelectVat
                  name="vat_id"
                  label="Taux TVA"
                  value={invoice.vat_id?.toString()}
                  onChange={handleChange}
                  options={vatRatesData?.getVats || []}
                  error={!!errors["vat_id"]}
                />
              </Grid>
              <Grid size={6}>
                <Typography variant="h6">
                  Total TTC : {invoice.total.toFixed(2)} €
                </Typography>
              </Grid>
              <Grid size={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={invoice.paid}
                      onChange={(e) =>
                        setInvoice({ ...invoice, paid: e.target.checked })
                      }
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
                <Typography>Justificatif</Typography>
                <BtnUpload onFileChange={handleFileUpload} />
                {invoice.receipt && (
                  <Typography variant="body2" color="textSecondary">
                    {invoice.receipt.name}
                  </Typography>
                )}
              </Grid>
              <Grid size={12}>
                <TextField
                  fullWidth
                  label="Informations complémentaires"
                  name="info"
                  value={invoice.info}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  aria-live="polite"
                />
              </Grid>
              <Grid size={12}>
                <Button type="submit" variant="contained" color="primary">
                  Enregistrer la facture
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </Paper>
  );
};
export default InvoiceForm;
