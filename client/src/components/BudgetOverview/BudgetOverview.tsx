import React from "react";
import { useGetBudgetOverviewQuery } from "../../types/graphql-types"; // Adaptez le chemin selon votre projet
import { PieChart } from "@mui/x-charts/PieChart";

const BudgetOverview: React.FC = () => {
  const { data, loading, error } = useGetBudgetOverviewQuery();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const budgetsData = data?.getBudgetOverview.budgets || [];
  const globalBudget = data?.getBudgetOverview.globalBudget || 0;

  const pieChartData = budgetsData.map((budget) => ({
    value: budget.amount,
    label: budget.commissions.name,
  }));
  console.info("pieChartData:", pieChartData);

  return (
    <article style={{ textAlign: "center" }}>
      <h2>Vue d'ensemble des budgets</h2>
      <h3>Budget global : {globalBudget.toLocaleString()} €</h3>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}€`,
            arcLabelRadius: "70%",
            data: pieChartData,
            innerRadius: 50,
            outerRadius: 190,
            startAngle: 0,
            endAngle: 360,
            cornerRadius: 0,
            highlightScope: { fade: "global", highlight: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            valueFormatter: (value: { value: number }) => `${value.value} €`,
          },
        ]}
        height={400}
      />
    </article>
  );
};

export default BudgetOverview;
