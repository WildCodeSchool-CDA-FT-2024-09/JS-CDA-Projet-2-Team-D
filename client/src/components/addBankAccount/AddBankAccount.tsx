import Grid from "@mui/material/Grid2";
import { Paper } from "@mui/material";
import { Bank } from "../../types/graphql-types";

interface AddBankAccountProps {
  invoiceId: number;
  selectedBank: string;
  setSelectedBank: (value: string) => void;
  banks: Bank[];
}

function AddBankAccount({
  selectedBank,
  setSelectedBank,
  banks,
}: AddBankAccountProps) {
  return (
    <Grid
      sx={{
        marginBottom: "2rem",
      }}
    >
      <Paper
        sx={{
          padding: 2,
          maxWidth: "800px",
          margin: "auto",
          border: "2px solid #ccc",
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Ajouter les données de la banque
        </h3>
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "1rem",
          }}
        >
          <Grid>
            <label htmlFor="bank">Banque :</label>
            <div>
              <select
                name="bank"
                id="bank"
                value={selectedBank}
                onChange={(e) => setSelectedBank(e.target.value)}
                aria-label="Sélectionnez une banque"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                }}
              >
                <option value="">Sélectionnez une banque</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.label}
                  </option>
                ))}
              </select>
            </div>
          </Grid>

          <Grid>
            <label htmlFor="account">N° de compte :</label>
            <div>
              <select
                name="numéro de compte"
                id="account"
                aria-label="Sélectionnez le numéro de compte"
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
                }}
              >
                <option value="">Sélectionnez le numéro de compte</option>
                {banks
                  .find((bank) => String(bank.id) === selectedBank)
                  ?.bankAccounts?.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_number}
                    </option>
                  )) || <option disabled>Aucun compte disponible</option>}
              </select>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default AddBankAccount;
