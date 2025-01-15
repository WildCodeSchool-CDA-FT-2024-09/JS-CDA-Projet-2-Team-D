import { useState } from "react";
import Grid from "@mui/material/Grid2";
import {
  useGetBanksQuery,
  useAssociateBankAccountToInvoiceMutation,
} from "../../types/graphql-types";
import { Paper, Button } from "@mui/material";
import useNotification from "../../hooks/useNotification";

function AddBankAccount({ invoiceId }: { invoiceId: number }) {
  const { data, loading, error } = useGetBanksQuery();
  const [selectedBank, setSelectedBank] = useState<string | "">("");

  const { notifySuccess, notifyError } = useNotification();

  const [
    associateBankAccountToInvoice,
    { loading: loadingAssociate, error: errorAssociate },
  ] = useAssociateBankAccountToInvoiceMutation();

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

  const handleAssociateBankAccount = async () => {
    const selectedBankAccount = banks?.find(
      (bank) => String(bank.id) === selectedBank,
    )?.bankAccounts?.[0];

    const bankAccountId = selectedBankAccount?.id
      ? Number(selectedBankAccount.id)
      : null;

    try {
      await associateBankAccountToInvoice({
        variables: {
          invoiceId,
          bankAccountId,
        },
      });
      notifySuccess(
        "Le compte bancaire a été associé à la facture avec succès",
      );
    } catch {
      notifyError(
        "Erreur lors de l'association du compte bancaire à la facture",
      );
    }
  };

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
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  fontSize: "0.8rem",
                  marginTop: "0.5rem",
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
                  marginTop: "0.5rem",
                }}
              >
                <option value="">Sélectionnez le numéro de compte</option>
                {banks
                  ?.find((bank) => String(bank.id) === selectedBank)
                  ?.bankAccounts?.map((account) => (
                    <option key={account.id} value={account.id}>
                      {account.account_number}
                    </option>
                  ))}
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
            onClick={handleAssociateBankAccount}
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
