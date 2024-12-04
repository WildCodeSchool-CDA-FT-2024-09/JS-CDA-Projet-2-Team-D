import React, { useState, ChangeEvent } from "react";
import {
  TextField,
  Button,
  Grid,
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
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface FactureState {
  commissions: string;
  date: Date | null;
  category: string;
  subcategory: string;
  clientId: number | "";
  label: string;
  type: string;
  montantHT: string;
  tauxTVA: string;
  montantTTC: string;
  justificatifs: string;
  payer: boolean;
  complementaryInfo: string;
  total: string;
}

const FactureForm: React.FC = () => {
  const [facture, setFacture] = useState<FactureState>({
    commissions: "",
    date: null,
    category: "",
    subcategory: "",
    clientId: "",
    label: "",
    type: "",
    montantHT: "",
    tauxTVA: "",
    montantTTC: "",
    justificatifs: "",
    payer: false,
    complementaryInfo: "",
    total: "",
  });

  const handleChange = (
    event:
      | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>,
  ) => {
    const { name, value } = event.target;
    setFacture((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClientIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFacture((prevState) => ({
      ...prevState,
      [name]: value === "" ? "" : Number(value),
    }));
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFacture((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFacture((prevState) => ({
      ...prevState,
      date: date,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.info(facture);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={3}
        style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}
      >
        <Typography variant="h5" gutterBottom>
          Saisie de facture
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Commissions</InputLabel>
                <Select
                  name="commissions"
                  value={facture.commissions}
                  onChange={handleChange}
                >
                  <MenuItem value="commission1">Commission 1</MenuItem>
                  <MenuItem value="commission2">Commission 2</MenuItem>
                  {/* Ajoutez d'autres options selon vos besoins */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Date"
                value={facture.date}
                onChange={handleDateChange}
                slots={{
                  textField: (params) => <TextField {...params} fullWidth />,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  name="category"
                  value={facture.category}
                  onChange={handleChange}
                >
                  <MenuItem value="categorie1">Catégorie 1</MenuItem>
                  <MenuItem value="categorie2">Catégorie 2</MenuItem>
                  {/* Ajoutez d'autres options selon vos besoins */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Sous-catégorie</InputLabel>
                <Select
                  name="subcategory"
                  value={facture.subcategory}
                  onChange={handleChange}
                >
                  <MenuItem value="souscategorie1">Sous-catégorie 1</MenuItem>
                  <MenuItem value="souscategorie2">Sous-catégorie 2</MenuItem>
                  {/* Ajoutez d'autres options selon vos besoins */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Client"
                name="clientId"
                type="number"
                value={facture.clientId}
                onChange={handleClientIdChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Libellé"
                name="label"
                value={facture.label}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={facture.type}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Montant HT"
                type="number"
                name="montantHT"
                value={facture.montantHT}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <InputLabel>Taux TVA</InputLabel>
                <Select
                  name="tauxTVA"
                  value={facture.tauxTVA}
                  onChange={handleChange}
                >
                  <MenuItem value={20}>20%</MenuItem>
                  <MenuItem value={10}>10%</MenuItem>
                  <MenuItem value={5.5}>5.5%</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Montant TTC"
                type="number"
                name="montantTTC"
                value={facture.montantTTC}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Justificatifs</InputLabel>
                <Select
                  name="justificatifs"
                  value={facture.justificatifs}
                  onChange={handleChange}
                >
                  <MenuItem value="justificatif1">Justificatif 1</MenuItem>
                  <MenuItem value="justificatif2">Justificatif 2</MenuItem>
                  {/* Ajoutez d'autres options selon vos besoins */}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={facture.payer}
                    onChange={handleCheckboxChange}
                    name="payer"
                  />
                }
                label="Payé"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Informations complémentaires"
                name="complementaryInfo"
                value={facture.complementaryInfo}
                onChange={handleChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Total"
                type="number"
                name="total"
                value={facture.total}
                onChange={handleChange}
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

export default FactureForm;
