import BudgetOverview from "../../components/budgetOverview/BudgetOverview";
import YearlyBalance from "../../components/budgetOverview/YearlyBalance";
import DisplayBalanceBankAccountForAdmin from "../../components/displayBalanceBankAccountForAdmin/displayBalanceBankAccountForAdmin";

function HomePageAdministrator() {
  return (
    <>
      <BudgetOverview />
      <YearlyBalance />
      <DisplayBalanceBankAccountForAdmin />
    </>
  );
}

export default HomePageAdministrator;
