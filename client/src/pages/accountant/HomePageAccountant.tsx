import DisplayInvoicesForAccountant from "../../components/displayInvoicesForAccountant/displayInvoicesForAccountant";
import DisplayBudgetByCommissionForAccountant from "../../components/displayBudgetByCommissionForAccountant/displayBudgetByCommissionForAccountant";
// import DisplayBudgetByCommissionForAccountant from "../../components/displayBudgetByCommissionForAccountant/displayBudgetByCommissionForAccountant";
function HomePageAccountant() {
  return (
    <>
      {/* <DisplayBudgetByCommissionForAccountant /> */}
      <DisplayBudgetByCommissionForAccountant />
      <DisplayInvoicesForAccountant />;
    </>
  );
}

export default HomePageAccountant;
