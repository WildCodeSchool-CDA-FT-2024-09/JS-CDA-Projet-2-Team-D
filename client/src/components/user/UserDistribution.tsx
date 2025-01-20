import React from "react";
import { useGetUsersQuery } from "../../types/graphql-types";
import { PieChart } from "@mui/x-charts/PieChart";
import { Paper } from "@mui/material";

const colors = [
  "#018571",
  "#DFC27D",
  "#80CDC1",
  "#EA452F",
  "#7570B3",
  "#A6611A",
  "#0F2080",
];

// Composant pour la distribution par commission
export const CommissionDistribution: React.FC = () => {
  const { data, loading, error } = useGetUsersQuery({
    variables: { limit: 100, offset: 0 },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data?.getUsers.users) return null;

  const commissionCounts = data.getUsers.users.reduce(
    (acc, user) => {
      user.commissions?.forEach((commission) => {
        if (commission.name) {
          acc[commission.name] = (acc[commission.name] || 0) + 1;
        }
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = Object.entries(commissionCounts).map(
    ([name, count], index) => ({
      id: index,
      value: count,
      label: name,
      color: colors[index % colors.length],
    }),
  );

  return (
    <Paper elevation={10} sx={{ p: 3, mb: 3 }}>
      <article style={{ textAlign: "center" }}>
        <h2>Distribution par commission</h2>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.value}`,
              arcLabelMinAngle: 20,
              arcLabelRadius: "80%",
              data: pieData,
              innerRadius: 30,
              outerRadius: 100,
              startAngle: 0,
              endAngle: 360,
              cornerRadius: 0,
              highlightScope: { fade: "global", highlighted: "item" },
              faded: {
                innerRadius: 20,
                additionalRadius: -20,
                color: "gray",
              },
            },
          ]}
          height={300}
          slotProps={{
            legend: {
              direction: "row",
              position: {
                vertical: "bottom",
                horizontal: "middle",
              },
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              markGap: 5,
              itemGap: 5,
            },
          }}
          margin={{
            top: 30,
            right: 20,
            bottom: 120,
            left: 20,
          }}
        />
      </article>
    </Paper>
  );
};

// Composant pour la distribution par rôle
export const RoleDistribution: React.FC = () => {
  const { data, loading, error } = useGetUsersQuery({
    variables: { limit: 100, offset: 0 },
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;
  if (!data?.getUsers.users) return null;

  const roleCounts = data.getUsers.users.reduce(
    (acc, user) => {
      user.roles?.forEach((role) => {
        if (role.label) {
          acc[role.label] = (acc[role.label] || 0) + 1;
        }
      });
      return acc;
    },
    {} as Record<string, number>,
  );

  const pieData = Object.entries(roleCounts).map(([name, count], index) => ({
    id: index,
    value: count,
    label: name,
    color: colors[index % colors.length],
  }));

  return (
    <Paper elevation={10} sx={{ p: 3, mb: 3 }}>
      <article style={{ textAlign: "center" }}>
        <h2>Distribution par rôle</h2>
        <PieChart
          series={[
            {
              arcLabel: (item) => `${item.value}`,
              arcLabelMinAngle: 20,
              arcLabelRadius: "80%",
              data: pieData,
              innerRadius: 30,
              outerRadius: 100,
              startAngle: 0,
              endAngle: 360,
              cornerRadius: 0,
              highlightScope: { fade: "global", highlighted: "item" },
              faded: {
                innerRadius: 20,
                additionalRadius: -20,
                color: "gray",
              },
            },
          ]}
          height={300}
          slotProps={{
            legend: {
              direction: "row",
              position: {
                vertical: "bottom",
                horizontal: "middle",
              },
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              markGap: 5,
              itemGap: 5,
            },
          }}
          margin={{
            top: 30,
            right: 20,
            bottom: 120,
            left: 20,
          }}
        />
      </article>
    </Paper>
  );
};
