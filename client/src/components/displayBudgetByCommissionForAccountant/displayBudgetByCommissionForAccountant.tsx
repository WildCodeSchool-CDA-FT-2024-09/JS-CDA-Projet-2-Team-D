import { BarChart } from "@mui/x-charts/BarChart";

export default function FixedBarChart() {
  const series = [{ label: "Dataset", data: [10, 20, 30, 40] }];
  const labels = ["Jan", "Feb", "Mar", "Apr"];

  return (
    <BarChart
      xAxis={[
        {
          scaleType: "band", // Spécifie que l'axe est de type "band"
          data: labels,
        },
      ]}
      series={series}
      width={600}
      height={400}
    />
  );
}
