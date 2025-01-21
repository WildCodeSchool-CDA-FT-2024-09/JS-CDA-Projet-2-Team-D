import { Gauge } from "@mui/x-charts";
import { useTheme, Box, Typography, Paper, useMediaQuery } from "@mui/material";
import Grid from "@mui/material/Grid2";

interface BudgetGaugeProps {
  globalBudget: number;
  currentBudget: number;
}

const BudgetGauge: React.FC<BudgetGaugeProps> = ({
  globalBudget,
  currentBudget,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const calculatePercentage = (remaining: number, global: number): number => {
    if (global <= 0) {
      return 100;
    }
    const percentage = 100 - Math.floor((remaining / global) * 100);
    if (remaining >= global) {
      return 0;
    } else {
      return Math.max(0, Math.min(100, percentage));
    }
  };

  const remainingBudget = globalBudget + currentBudget;

  const percentage = calculatePercentage(remainingBudget, globalBudget);

  const getColor = (value: number) => {
    if (value <= 60) return theme.palette.success.main;
    if (value <= 80) return theme.palette.warning.main;
    return theme.palette.error.main;
  };

  return (
    <Paper elevation={10} sx={{ p: 3, mb: 3 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: theme.palette.primary.main,
          textAlign: "center",
        }}
      >
        Budget global : {globalBudget.toLocaleString()} €
      </Typography>

      <Grid container spacing={1} alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ height: 250 }}>
            <Gauge
              startAngle={-120}
              endAngle={120}
              value={percentage}
              valueMax={100}
              valueMin={0}
              innerRadius={80}
              outerRadius={100}
              sx={{
                width: "100%",
                height: "100%",
                "& .MuiGauge-valueText": {
                  fontSize: 40,
                  fontWeight: "bold",
                },
                "& .MuiGauge-valueArc": {
                  fill: getColor(percentage),
                },
                "& .MuiGauge-referenceArc": {
                  fill: theme.palette.grey[300],
                },
              }}
              text={({ value }) => `${value} %`}
            />
          </Box>
        </Grid>

        {/* Informations à droite */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              height: "100%",
              justifyContent: "center",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
            >
              Total des factures : {currentBudget.toLocaleString()} €
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
              }}
            >
              Budget restant : {remainingBudget.toLocaleString()} €
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BudgetGauge;
