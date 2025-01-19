import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { useGetYearlyInvoiceSummaryQuery } from "../../types/graphql-types";
import { currencySignValueFormatter } from "../../utils/chartsUtils";

const chartSetting = {
  width: 800,
  height: 300,
  margin: { left: 200 },
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

function YearlyBalance() {
  const { data, loading, error } = useGetYearlyInvoiceSummaryQuery();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <>
      <BarChart
        dataset={data?.getYearlyInvoiceSummary}
        xAxis={[{ scaleType: "band", dataKey: "year" }]}
        yAxis={[
          {
            scaleType: "linear",
            dataKey: "balance",
            valueFormatter: (value: number) =>
              new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR",
              }).format(value),
          },
        ]}
        series={[
          {
            dataKey: "total_credits",
            label: "Crédit",
            valueFormatter: currencySignValueFormatter,
          },
          {
            dataKey: "total_debits",
            label: "Débit",
            valueFormatter: currencySignValueFormatter,
          },
          {
            dataKey: "balance",
            label: "Balance",
            valueFormatter: currencySignValueFormatter,
          },
        ]}
        {...chartSetting}
      />
    </>
  );
}

export default YearlyBalance;
