import React from "react";
import { useGetBudgetOverviewQuery } from "../../types/graphql-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { DisplayBalanceBankAccountForAdmin } from "../displayBalanceBankAccountForAdmin/displayBalanceBankAccountForAdmin";
import { colors } from "../../utils/chartColors";

const BudgetOverview: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { data, loading, error } = useGetBudgetOverviewQuery();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const budgetsData = data?.getBudgetOverview.budgets || [];
  const globalBudget = data?.getBudgetOverview.globalBudget || 0;

  const pieChartData = budgetsData.map((budget, index) => ({
    value: parseFloat(budget.amount.toFixed(2)),
    label: budget.commissions.name,
    color: colors[index % colors.length],
  }));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        p: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          width: "100%",
          mx: "auto",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Vue d'ensemble des budgets
        </Typography>
        <Typography variant="h5" gutterBottom>
          Budget global : {globalBudget.toFixed(2)} €
        </Typography>

        <Box
          sx={{
            width: "100%",
            position: "relative",
            pl: { xs: 2, md: 0 }, // padding gauche pour mobile
            pr: { xs: 4, md: 16 }, // espace pour la légende sur desktop
          }}
        >
          <PieChart
            series={[
              {
                arcLabel: (item) => `${item.value.toFixed(2)}€`,
                arcLabelMinAngle: 20,
                arcLabelRadius: isMobile ? "70%" : "60%",
                data: pieChartData,
                innerRadius: 50,
                outerRadius: isMobile ? 140 : 190,
                startAngle: 0,
                endAngle: 360,
                cornerRadius: 0,
                highlightScope: { fade: "global", highlight: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                valueFormatter: (value: { value: number }) =>
                  `${value.value.toFixed(2)} €`,
              },
            ]}
            height={isMobile ? 400 : 500}
            slotProps={{
              legend: {
                direction: isMobile ? "row" : "column",
                position: {
                  vertical: isMobile ? "bottom" : "middle",
                  horizontal: isMobile ? "middle" : "right",
                },
                padding: isMobile ? 10 : 20,
                itemMarkWidth: isMobile ? 10 : 15,
                itemMarkHeight: isMobile ? 10 : 15,
                markGap: isMobile ? 5 : 10,
                itemGap: isMobile ? 5 : 15,
              },
            }}
            margin={{
              top: 20,
              right: isMobile ? 20 : 150,
              bottom: isMobile ? 120 : 20,
              left: 20,
            }}
          />
        </Box>
      </Box>

      <Box sx={{ maxWidth: 1200, width: "100%", mx: "auto" }}>
        <DisplayBalanceBankAccountForAdmin />
      </Box>
    </Box>
  );
};

export default BudgetOverview;
