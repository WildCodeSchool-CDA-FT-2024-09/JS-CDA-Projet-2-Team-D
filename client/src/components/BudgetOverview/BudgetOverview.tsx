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
    id: budget.commissions.name, // Nom de la commission
    value: budget.amount, // Montant du budget
  }));

  return (
    <div>
      <h2>Vue d'ensemble des budgets</h2>
      <p>Budget global : {globalBudget.toLocaleString()} €</p>
      <PieChart
        series={[
          {
            data: pieChartData,
            highlightScope: { fade: "global", highlight: "item" },
            valueFormatter: (value) => `${value.toLocaleString()} €`,
          },
        ]}
        height={400}
      />
    </div>
  );
};

export default BudgetOverview;
