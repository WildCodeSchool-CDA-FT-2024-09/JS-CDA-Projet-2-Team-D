import DisplayInvoicesForAccountant from "../../components/displayInvoicesForAccountant/displayInvoicesForAccountant";
import DisplayBudgetByCommissionForAccountant from "../../components/displayBudgetByCommissionForAccountant/DisplayBudgetByCommissionForAccountant";

function HomePageAccountant() {
  return (
    <>
      <DisplayBudgetByCommissionForAccountant />
      <DisplayInvoicesForAccountant />
    </>
  );
}

export default HomePageAccountant;
