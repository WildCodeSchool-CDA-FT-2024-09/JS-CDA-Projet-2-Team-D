import Grid from "@mui/material/Grid2";
import { useGetBanksQuery } from "../../types/graphql-types";
import { Paper, Button } from "@mui/material";

function AddBankAccount() {
  const { data, loading, error } = useGetBanksQuery();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("GraphQL error: ", error);
    return (
      <div>
        <p>Error :(</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const banks = data?.getBanks;

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
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem", // Ajoute un espace entre le label et le select
                }}
              >
                <option value="">Sélectionnez une banque</option>
                {banks?.map((bank) => (
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
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem", // Ajoute un espace entre le label et le select
                }}
              >
                <option value="">Sélectionnez le numéro de compte</option>
                {banks?.map((bank) =>
                  bank.bankAccounts?.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_number}
                    </option>
                  )),
                )}
              </select>
            </div>
          </Grid>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{
              fontWeight: "bold",
              fontSize: "0.8rem",
              marginTop: "1rem",
            }}
          >
            Valider les informations bancaires
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default AddBankAccount;
