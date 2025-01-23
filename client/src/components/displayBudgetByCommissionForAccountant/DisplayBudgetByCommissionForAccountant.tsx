import Box from "@mui/material/Box";

// Comment code for slider and checkbox
// import Slider from "@mui/material/Slider";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetBudgetOverviewQuery } from "../../types/graphql-types";
import PageTitle from "../../components/PageTitle";
import { colors } from "../../utils/chartColors";

function DisplayBudgetByCommissionForAccountant() {
  // const [seriesNb, setSeriesNb] = React.useState(7);
  // const [skipAnimation, setSkipAnimation] = React.useState(false);

  const { data, loading, error } = useGetBudgetOverviewQuery();

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.error("GraphQL error: ", error);
    return (
      <div>
        <p>Error :(</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  const budgets = data?.getBudgetOverview?.budgets || [];

  const series = budgets.map((budget) => ({
    label: budget.commissions.name,
    data: [budget.amount],
  }));

  // Comment code for slider and checkbox
  // const handleSeriesNbChange = (_: Event, newValue: number | number[]) => {
  //   if (typeof newValue !== "number") {
  //     return;
  //   }
  //   setSeriesNb(newValue);
  // };

  const predefinedColors = colors;

  const colorsMap = budgets.map(
    (_, index) => predefinedColors[index % predefinedColors.length],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PageTitle title="Etat des budgets par commission" />
      </Box>
      <BarChart
        height={600}
        series={series.slice(0, 7)}
        // skipAnimation={skipAnimation}
        colors={colorsMap}
        sx={{
          "& .MuiLegend-root": {
            marginTop: "16px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "50px",
          },
          "& .MuiLegend-item": {
            marginBottom: "8px",
          },
        }}
      />

      {
        // Comment code for slider and checkbox
        /* <FormControlLabel
        checked={skipAnimation}
        control={
          <Checkbox
            onChange={(event) => setSkipAnimation(event.target.checked)}
          />
        }
        label="skipAnimation"
        labelPlacement="end"
      />
      <Typography id="input-series-number" gutterBottom>
        Number of series
      </Typography>
      <Slider
        value={seriesNb}
        onChange={handleSeriesNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={series.length}
        aria-labelledby="input-series-number"
      /> */
      }
    </Box>
  );
}

export default DisplayBudgetByCommissionForAccountant;
