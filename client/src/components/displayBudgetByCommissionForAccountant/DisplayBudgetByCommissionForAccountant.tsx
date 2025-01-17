import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import Slider from "@mui/material/Slider";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import { useGetBudgetOverviewQuery } from "../../types/graphql-types";

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

  // const handleSeriesNbChange = (_: Event, newValue: number | number[]) => {
  //   if (typeof newValue !== "number") {
  //     return;
  //   }
  //   setSeriesNb(newValue);
  // };

  const predefinedColors = [
    "#018571",
    "#DFC27D",
    "#80CDC1",
    "#EA452F",
    "#7570B3",
    "#A6611A",
    "#0F2080",
  ];

  const colors = budgets.map(
    (_, index) => predefinedColors[index % predefinedColors.length],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", mt: 2, mb: 2 }}
      >
        Etat des budgets par commission
      </Typography>
      <BarChart
        height={600}
        series={series.slice(0, 7)}
        // skipAnimation={skipAnimation}
        colors={colors}
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
      {/* <FormControlLabel
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
      /> */}
    </Box>
  );
}

export default DisplayBudgetByCommissionForAccountant;
