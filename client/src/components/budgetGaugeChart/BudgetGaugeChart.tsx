import { Gauge } from "@mui/x-charts";
import { useTheme } from "@mui/material";

interface BudgetGaugeProps {
  globalBudget: number;
  currentBudget: number;
}

const BudgetGauge: React.FC<BudgetGaugeProps> = ({
  globalBudget,
  currentBudget,
}) => {
  const theme = useTheme();

  const pourcentage =
    globalBudget > 0 ? Math.floor((-currentBudget / globalBudget) * 100) : 0;
  const getColor = (value: number) => {
    if (value <= 50) return theme.palette.success.main;
    if (value <= 75) return theme.palette.secondary.main;
    return theme.palette.error.main;
  };

  return (
    <article style={{ textAlign: "center" }}>
      <h2>Budget global : {globalBudget.toFixed(2)} €</h2>
      <h3>Total des dépenses : {currentBudget.toLocaleString()} €</h3>
      <Gauge
        startAngle={-120}
        endAngle={120}
        value={pourcentage}
        valueMax={100}
        valueMin={0}
        innerRadius="80%"
        outerRadius="100%"
        sx={{
          height: 200,
          "& .MuiGauge-valueText": {
            fontSize: 40,
          },
          "& .MuiGauge-valueArc": {
            fill: getColor(pourcentage),
          },
          "& .MuiGauge-referenceArc": {
            fill: "#DADBBD",
          },
        }}
      />
    </article>
  );
};

export default BudgetGauge;
