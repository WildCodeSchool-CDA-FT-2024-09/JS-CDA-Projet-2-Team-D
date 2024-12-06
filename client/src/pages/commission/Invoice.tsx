import React, { useState, ChangeEvent } from "react";
// import Grid2 from "@mui/system/Unstable_Grid2";
import {
  TextField,
  Grid,
  Button,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
} from "@mui/material";
import {
  useGetVatsQuery,
  useGetCategoriesQuery,
  useGetCommissionsQuery,
} from "../../types/graphql-types";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface InvoiceState {
  commission_id: number;
  date: Date | null;
  category_id: number;
  invoice_id: string;
  subcategory_id: number;
  label: string;
  credit_debit_id: number;
  receipt: string;
  info: string;
  paid: boolean;
  price_without_vat: number;
  vat_id: number;
  status_id: number;
  user_id: number;
  total: number; // Total amount (TTC)
}

const generateInvoiceId = (
  currentYear: number,
  lastInvoiceId?: number,
): string => {
  const newInvoiceId = (lastInvoiceId || 0) + 1; // Increment existing ID or start from 1z à partir de 1
  return `Facture - ${currentYear} - ${newInvoiceId}`;
};

const InvoiceForm: React.FC = () => {
  // Requête pour récupérer les catégories, sous-catégories, et types de crédit/débit
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

  const currentYear = new Date().getFullYear();

  const [invoice, setInvoice] = useState<InvoiceState>({
    commission_id: 0,
    date: null,
    price_without_vat: 0,
    category_id: 0,
    invoice_id: generateInvoiceId(currentYear),
    subcategory_id: 0,
    label: "",
    receipt: "",
    credit_debit_id: 1,
    info: "",
    paid: false,
    vat_id: 0,
    status_id: 2,
    user_id: 0,
    total: 0,
  });

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
  ) => {
    const { name, value } = event.target;
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

    // Gestion de la logique spécifique pour "price_without_vat" ou "vat_id"
    if (name === "price_without_vat" || name === "vat_id") {
      const ht =
        name === "price_without_vat"
          ? typeof parsedValue === "number"
            ? parsedValue
            : 0
          : invoice.price_without_vat;

      // Vérifier si les données de taux de TVA sont disponibles
      if (!vatRatesData?.getVats) {
        console.error("Les données de taux de TVA ne sont pas disponibles.");
        return;
      }

      // Trouver le taux de TVA correspondant
      const selectedVAT = vatRatesData.getVats.find(
        (vat) => vat.id === (name === "vat_id" ? parsedValue : invoice.vat_id),
      );

      if (!selectedVAT) {
        console.error("Aucun taux de TVA trouvé pour cet ID");
        return;
      }

      const vatRate = selectedVAT.rate || 0;

      // Calculer le total TTC
      const totalTTC = ht + (ht * vatRate) / 100;

      // Mettre à jour l'état avec le prix total TTC calculé
      setInvoice((prevState) => ({
        ...prevState,
        [name]: parsedValue,
        total: totalTTC,
      }));
    } else {
      // Si ce n'est pas "price_without_vat" ou "vat_id", simplement mettre à jour l'état
      setInvoice((prevState) => ({
        ...prevState,
        [name]: parsedValue,
      }));
    }
  };

  const handleDateChange = (date: Date | null) => {
    setInvoice((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Prepare the input object based on the current state
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
    console.info("Form data:", invoice);
  };

  // try {
  //   const response = await createInvoice({ variables: { input } });
  //   console.info("Invoice created:", response.data.setInvoice);
  // } catch (error) {
  //   console.error("Error creating invoice:", error);
  // }
  // Vérifier si une requête est en cours ou si une erreur est survenue
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
      >
        <Typography variant="h5" gutterBottom>
          Facture
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Invoice ID"
              name="invoice_id"
              value={invoice.invoice_id}
              InputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Commissions</InputLabel>
                <Select
                  name="commission_id"
                  value={invoice.commission_id.toString()}
                  onChange={handleChange}
                >
                  {/* Afficher les options de commissions */}
                  {commissionsData?.getCommissions &&
                  commissionsData.getCommissions.length > 0 ? (
                    commissionsData.getCommissions.map((commission) => (
                      <MenuItem
                        key={commission.id}
                        value={commission.id.toString()}
                      >
                        {commission.name}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="">Aucune commission disponible</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date"
                value={invoice.date}
                onChange={handleDateChange}
                slots={{
                  textField: (params) => <TextField {...params} fullWidth />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <FormControl fullWidth>
                  <InputLabel>Catégorie</InputLabel>
                  <Select
                    name="category_id"
                    value={invoice.category_id.toString()}
                    onChange={handleChange}
                  >
                    {/* Check if a category has subcategories */}
                    {categoriesData?.getCategories.map((category) => {
                      if (category.id === invoice.category_id) {
                        if (category.subcategories?.length > 0) {
                          return category.subcategories.map((subcategory) => (
                            <MenuItem
                              key={subcategory.id}
                              value={subcategory.id.toString()}
                            >
                              {subcategory.label}
                            </MenuItem>
                          ));
                        } else {
                          return (
                            <MenuItem key="no-subcategory" value="">
                              Aucune sous-catégorie disponible
                            </MenuItem>
                          );
                        }
                      }
                      return null;
                    })}
                  </Select>
                </FormControl>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sous-catégorie</InputLabel>
                <Select
                  name="subcategory_id"
                  value={invoice.subcategory_id.toString()}
                  onChange={handleChange}
                >
                  {categoriesData?.getCategories
                    .find((category) => category.id === invoice.category_id)
                    ?.subcategories.map((subcategory) => (
                      <MenuItem
                        key={subcategory.id}
                        value={subcategory.id.toString()}
                      >
                        {subcategory.label}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Libellé"
                name="label"
                value={invoice.label}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  name="credit_debit_id"
                  value={invoice.credit_debit_id.toString()}
                  onChange={handleChange}
                >
                  {/* Accédez à creditDebit directement car c'est un objet, pas un tableau */}
                  {categoriesData?.getCategories.find(
                    (category) => category.id === invoice.category_id,
                  )?.creditDebit ? ( // Vérification si creditDebit existe
                    <MenuItem
                      key={invoice.credit_debit_id}
                      value={invoice.credit_debit_id.toString()}
                    >
                      {
                        categoriesData.getCategories.find(
                          (category) => category.id === invoice.category_id,
                        )?.creditDebit.label
                      }
                    </MenuItem>
                  ) : (
                    <MenuItem value="">Aucun type disponible</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Montant HT"
                type="number"
                name="price_without_vat"
                value={invoice.price_without_vat}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Taux TVA</InputLabel>
                <Select
                  name="vat_id"
                  value={invoice.vat_id.toString()}
                  onChange={(e) => handleChange(e as SelectChangeEvent)}
                >
                  {/* Afficher les options de TVA */}
                  {vatRatesData?.getVats.map(
                    (vat: { id: number; label: string }) => (
                      <MenuItem key={vat.id} value={vat.id.toString()}>
                        {vat.label}
                      </MenuItem>
                    ),
                  )}
                </Select>
              </FormControl>
            </Grid>
            {/* Total - Display only */}
            <Grid item xs={12}>
              <Typography>Total TTC : {invoice.total.toFixed(2)} €</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Justificatifs</InputLabel>
                <Select
                  name="receipt"
                  value={invoice.receipt}
                  onChange={handleChange}
                >
                  <MenuItem value="justificatif1">Justificatif 1</MenuItem>
                  <MenuItem value="justificatif2">Justificatif 2</MenuItem>
                  {/* Ajoutez d'autres options selon vos besoins */}
                </Select>
              </FormControl>
            </Grid>
            {/* Checkbox for Paid */}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={invoice.paid}
                    onChange={(e) =>
                      setInvoice({ ...invoice, paid: e.target.checked })
                    }
                    name="paid"
                  />
                }
                label="Paid"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Informations complémentaires"
                name="info"
                value={invoice.info}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Enregistrer la facture
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};
export default InvoiceForm;
