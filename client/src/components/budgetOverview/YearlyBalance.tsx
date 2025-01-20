import { useGetYearlyInvoiceSummaryQuery } from "../../types/graphql-types";
import { currencySignValueFormatter } from "../../utils/chartsUtils";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { Box } from "@mui/system";

const chartSetting = {
  width: 800,
  height: 300,
  // margin: { left: 10 },
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
      <article style={{ textAlign: "center" }}>
        <h2>Etats des exercises annuels</h2>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <BarChart
            dataset={data?.getYearlyInvoiceSummary}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "year",
                valueFormatter: (value: number) => value.toString(),
              },
            ]}
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
        </Box>
      </article>
    </>
  );
}

export default YearlyBalance;
