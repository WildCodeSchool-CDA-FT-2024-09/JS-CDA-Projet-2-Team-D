import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { colors } from "../utils/chartColors";

interface PieChartDistributionProps {
  title: string;
  data: Record<string, number>;
}

export const PieChartDistribution: React.FC<PieChartDistributionProps> = ({
  title,
  data,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const pieData = Object.entries(data).map(([name, count], index) => ({
    id: index,
    value: count,
    label: name,
    color: colors[index % colors.length],
  }));

  return (
    <Paper elevation={10} sx={{ p: 3, mb: 3 }}>
      <article style={{ textAlign: "center" }}>
        <h2>{title}</h2>
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
              itemMarkWidth: isMobile ? 10 : 20,
              itemMarkHeight: isMobile ? 10 : 20,
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
