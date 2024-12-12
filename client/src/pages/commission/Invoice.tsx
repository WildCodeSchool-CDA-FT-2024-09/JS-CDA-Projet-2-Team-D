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
// import { Formik } from "formik";

import FormSelect from "../../components/FormSelect";
import FormTextField from "../../components/FormTextField";
import { FormSelectVat, Invoice } from "../../components/FormSelectVat";
import {
  InvoiceState,
  initialValues,
  // invoiceValidationSchema,
} from "../../types/InvoiceInputType";
import {
  useGetVatsQuery,
  useGetCategoriesQuery,
  // useGetCommissionsQuery,
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

  const [invoice, setInvoice] = useState<InvoiceState>(initialValues);

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
  ) => {
    const { name, value } = event.target;

    // let parsedValue: string | number | boolean | Date = value;

    // if (event.target instanceof HTMLInputElement) {
    //   const { type, checked } = event.target;
    //   if (type === "checkbox" || type === "radio") {
    //     parsedValue = checked; // Gestion des cases à cocher et des boutons radio
    //   }
    // } else if (value === "") {
    //   // Si la valeur est vide, on assigne une valeur par défaut pour certains champs
    //   if (
    //     [
    //       "price_without_vat",
    //       "commission_id",
    //       "category_id",
    //       "subcategory_id",
    //     ].includes(name)
    //   ) {
    //     parsedValue = 0;
    //   }
    // } else if (typeof value === "string" && !isNaN(Number(value))) {
    //   parsedValue = parseFloat(value); // Si la valeur peut être convertie en nombre, on le fait
    // }

    // Séparer les cas où les types sont différents
    if (name === "price_without_vat" || name === "vat_id") {
      // Cas spécifiques pour "price_without_vat" et "vat_id"
      setInvoice((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (name === "category_id") {
      // Cas particulier pour "category_id"
      setInvoice((prevState) => ({
        ...prevState,
        [name]: +value as number,
        credit_debit_id: getCreditDebitId(+value as number), // Update credit/debit id
      }));
    } else if (name === "paid") {
      // Cas particulier pour "paid" (bascule entre true/false)
      setInvoice((prevState) => ({
        ...prevState,
        [name]: !prevState.paid, // Basculer l'état de "paid"
      }));
    } else {
      // Cas général : mise à jour de l'état pour d'autres champs
      setInvoice((prevState) => ({
        ...prevState,
        [name]: value,
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

  // const handleSubmit = async (values: InvoiceState) => {
  //   console.info("Données du formulaire :", values);
  // }

  //   const input = {
  //     commission_id: values.commission_id,
  //     date: values.date,
  //     category_id: values.category_id,
  //     subcategory_id: values.subcategory_id,
  //     invoice_id: values.invoice_id,
  //     label: values.label,
  //     credit_debit_id: values.credit_debit_id,
  //     price_without_vat: values.price_without_vat,
  //     vat_id: values.vat_id,
  //     receipt: values.receipt,
  //     paid: values.paid,
  //     info: values.info,
  //     status_id: values.status_id,
  //     user_id: values.user_id,
  //     total: values.total,
  //   }

  // try {
  //   const response = await setInvoice({ variables: { input } });
  //   console.info("Invoice created:", response.data.setInvoice);
  // } catch (error) {
  //   console.error("Error creating invoice:", error);
  // }

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info("Validation réussie :", invoice);
  };

  const loading = loadingCategories || loadingVatRates;
  const error = categoriesError || vatRatesError;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return (
      <Typography>
        Error: {categoriesError?.message || vatRatesError?.message}
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
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={6}>
            <FormSelect
              name="commission_id"
              label="Commissions"
              value={invoice.commission_id}
              onChange={handleInvoiceChange}
              // error={errors["commission_id"]}
              // error={touched.commission_id && !!errors.commission_id}
              // helperText={touched.commission_id && errors.commission_id ? errors.commission_id : ''}
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
          <Grid size={6}>
            {/*<FormSelect
                  name="category_id"
                  label="Catégories"
                  value={invoice.category_id.toString()}
                  onChange={handleChange}
                  options={categoriesData?.getCategories || []}
                  error={errors["category_id"]}
                />*/}
          </Grid>
          <Grid size={6}>
            {/*<FormSelect
                  name="subcategory_id"
                  label="Sous-catégories"
                  value={invoice.subcategory_id.toString()}
                  onChange={handleChange}
                  options={
                    categoriesData?.getCategories.find(
                      (category) => category.id === invoice.category_id
                    )?.subcategories || []
                  }
                  error={errors["subcategory_id"]}
                />*/}
          </Grid>
          <FormTextField
            name="label"
            label="Libellé"
            value={invoice.label}
            onChange={handleInvoiceChange}
            // error={touched.label && !!errors.label}
            // helperText={touched.label && errors.label}
          />
          <Grid size={6}>
            <FormTextField
              name="price_without_vat"
              label="Prix HT"
              type="number"
              value={
                invoice.price_without_vat === 0 ? "" : invoice.price_without_vat
              }
              onChange={handleInvoiceChange}
              inputProps={{ min: 0 }}
              // error={!!errors["price_without_vat"]}
              // helperText={errors["price_without_vat"]}
              //verror={touched.price_without_vat && !!errors.price_without_vat}
              //vhelperText={touched.price_without_vat && errors.price_without_vat}
            />
          </Grid>
          <Grid size={6}>
            <FormSelectVat
              name="vat_id"
              label="Taux de TVA"
              value={invoice.vat_id?.toString()}
              onChange={handleInvoiceChange}
              options={vatRatesData?.getVats || []}
              // error={!!errors["vat_id"]}
              priceWithoutVat={invoice.price_without_vat}
              setInvoice={
                setInvoice as React.Dispatch<React.SetStateAction<Invoice>>
              }
            />
          </Grid>
          <Grid size={6}>
            <Typography variant="h6">
              Total TTC :{" "}
              {invoice.category_id !== 0 ? (
                <span
                  style={{
                    fontWeight: "bold",
                    color: invoice.credit_debit_id === 1 ? "green" : "red",
                  }}
                >
                  {invoice.credit_debit_id === 1 ? "+" : "-"}
                </span>
              ) : (
                ""
              )}
              {invoice.total.toFixed(2)} €
              {invoice.category_id !== 0 && (
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
              )}
            </Typography>
          </Grid>

          <Grid size={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={invoice.paid}
                  onChange={handleInvoiceChange}
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
          <Grid size={12} container justifyContent="center">
            <Button type="submit" variant="contained" color="primary">
              Enregistrer la facture
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};
export default InvoiceForm;
