import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetBanksQuery } from "../../types/graphql-types";
import { useMediaQuery, useTheme } from "@mui/material";
import { colors } from "../../utils/chartColors";

interface BankAccount {
  __typename?: "BankAccount";
  name: string;
  account_number: string;
  balance: number;
  id: number;
}

interface Bank {
  __typename?: "Bank";
  label: string;
  id: number;
  bankAccounts?: BankAccount[] | null;
}

export function DisplayBalanceBankAccountForAdmin() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { data, loading, error } = useGetBanksQuery();

  if (loading) return <p>Chargement...</p>;
  if (error) {
    return (
      <div>
        <p>Erreur :</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const banks = (data?.getBanks || []) as Bank[];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        gap: 4,
        justifyContent: "center",
      }}
    >
      {banks.map((bank) => {
        const bankAccounts = bank.bankAccounts || [];

        const series = [
          {
            data: bankAccounts.map((account) => account.balance),
            label: "Solde",
          },
        ];

        const categories = bankAccounts.map((account) => account.name);

        return (
          <Box
            key={bank.id}
            sx={{
              flex: isMobile ? "1 1 100%" : "1 1 45%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Typography variant="h5" gutterBottom>
              {bank.label}
            </Typography>
            <BarChart
              height={isMobile ? 400 : 300}
              series={series}
              colors={bankAccounts.map(
                (_, accountIndex) => colors[accountIndex % colors.length],
              )}
              xAxis={[
                {
                  data: categories,
                  scaleType: "band",
                },
              ]}
              sx={{
                "& .MuiLegend-root": {
                  marginTop: "16px",
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "50px",
                },
                "& .MuiLegend-item": {
                  marginBottom: "8px",
                },
              }}
            />
          </Box>
        );
      })}
    </Box>
  );
}
