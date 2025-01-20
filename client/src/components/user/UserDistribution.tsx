import React from "react";
import { useGetUsersQuery } from "../../types/graphql-types";
import { PieChartDistribution } from "../PieChartUserDIstribution"; // Assurez-vous que le chemin est correct

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

  return (
    <PieChartDistribution
      title="Utilisateurs par commission"
      data={commissionCounts}
    />
  );
};

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

  return (
    <PieChartDistribution title="Utilisateurs par rôle" data={roleCounts} />
  );
};
