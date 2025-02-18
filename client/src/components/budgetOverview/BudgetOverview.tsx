import React from "react";
import { useGetBudgetOverviewQuery } from "../../types/graphql-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { colors } from "../../utils/chartColors";
import { Paper, useMediaQuery, useTheme } from "@mui/material";

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
    <>
      <Paper elevation={10} sx={{ p: 3, mb: 3 }}>
        <article style={{ textAlign: "center" }}>
          <h2>Vue d'ensemble des budgets</h2>
          <h3>Budget global : {globalBudget.toFixed(2)} €</h3>
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
                padding: isMobile ? 10 : 90,
                itemMarkWidth: isMobile ? 10 : 20,
                itemMarkHeight: isMobile ? 10 : 20,
                markGap: isMobile ? 5 : 15,
                itemGap: isMobile ? 5 : 30,
              },
            }}
            margin={{
              top: 20,
              right: isMobile ? 20 : 100,
              bottom: isMobile ? 120 : 20,
              left: 20,
            }}
          />
        </article>
      </Paper>
    </>
  );
};

export default BudgetOverview;
