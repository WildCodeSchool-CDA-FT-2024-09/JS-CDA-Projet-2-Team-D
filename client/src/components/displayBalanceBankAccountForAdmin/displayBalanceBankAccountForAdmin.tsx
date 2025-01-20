import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BarChart } from "@mui/x-charts/BarChart";
import { useMediaQuery, useTheme } from "@mui/material";
// import { axisClasses } from '@mui/x-charts';
import { colors } from "../../utils/chartColors";
import { useGetBanksQuery } from "../../types/graphql-types";

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
    <Box>
      <Typography variant="h2" align="center" gutterBottom sx={{ mb: 4 }}>
        État des soldes bancaires par banque
      </Typography>
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

          const series = bankAccounts.map((account) => ({
            data: [account.balance],
            label: account.name,
            valueFormatter: (value: number | null) =>
              value !== null
                ? new Intl.NumberFormat("fr-FR", {
                    style: "currency",
                    currency: "EUR",
                  }).format(value)
                : "",
          }));

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
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 90, // Augmenté pour la légende
                  left: 40,
                }}
                series={series}
                colors={bankAccounts.map(
                  (_, accountIndex) => colors[accountIndex % colors.length],
                )}
                xAxis={[
                  {
                    data: [""],
                    scaleType: "band",
                  },
                ]}
                slotProps={{
                  legend: {
                    direction: "row",
                    position: {
                      vertical: "bottom",
                      horizontal: "middle",
                    },
                    padding: { top: 20 },
                    hidden: false,
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default DisplayBalanceBankAccountForAdmin;
