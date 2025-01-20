import BudgetOverview from "../../components/budgetOverview/BudgetOverview";
import YearlyBalance from "../../components/budgetOverview/YearlyBalance";
import {
  CommissionDistribution,
  RoleDistribution,
} from "../../components/user/UserDistribution";
import Grid from "@mui/material/Grid2";

function HomePageAdministrator() {
  return (
    <>
      <BudgetOverview />
      <YearlyBalance />
      <Grid
        container
        spacing={2}
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
        }}
      >
        <Grid size={{ xs: 12, md: 6 }}>
          <CommissionDistribution />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RoleDistribution />
        </Grid>
      </Grid>
    </>
  );
}

export default HomePageAdministrator;
