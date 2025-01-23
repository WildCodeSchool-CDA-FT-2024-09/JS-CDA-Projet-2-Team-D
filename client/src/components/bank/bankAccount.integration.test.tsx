import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Table, TableBody } from "@mui/material";
import BankAccountRow from "../../components/bank/BankAccountRow";
import { Bank, BankAccount, Maybe } from "../../types/graphql-types";

describe("BankAccountRow Tests", () => {
  afterEach(() => {
    cleanup();
  });

  // Test data configuration with correct types
  const createBankAccount = (
    id: number,
    name: string,
    accountNumber: string,
    balance: number,
    bank: Bank,
  ): BankAccount => ({
    id,
    name,
    account_number: accountNumber,
    balance,
    bank,
  });

  const createBank = (
    id: number,
    label: string,
    accounts: BankAccount[],
  ): Bank => {
    const bank: Bank = {
      id,
      label,
      bankAccounts: accounts as Maybe<BankAccount[]>,
    };
    if (bank.bankAccounts) {
      bank.bankAccounts = accounts.map((account) => ({
        ...account,
        bank,
      }));
    }
    return bank;
  };

  const bankA = createBank(1, "Banque A", [
    createBankAccount(1, "Compte Courant", "BA001", 1500, {} as Bank),
  ]);

  const bankB = createBank(2, "Banque B", [
    createBankAccount(2, "Compte Courant", "BB001", 2500, {} as Bank),
    createBankAccount(3, "Livret A", "BB002", 15000, {} as Bank),
  ]);

  const bankC = createBank(3, "Banque C", [
    createBankAccount(4, "Compte Courant", "BC001", 3500, {} as Bank),
    createBankAccount(5, "Livret A", "BC002", 25000, {} as Bank),
    createBankAccount(6, "PEL", "BC003", 50000, {} as Bank),
  ]);

  const renderWithTable = (children: React.ReactNode) => {
    return render(
      <Table>
        <TableBody>{children}</TableBody>
      </Table>,
    );
  };

  it("devrait afficher correctement le nombre de comptes pour chaque banque", async () => {
    const testCases = [
      { bank: bankA, expectedAccounts: 1 },
      { bank: bankB, expectedAccounts: 2 },
      { bank: bankC, expectedAccounts: 3 },
    ];

    for (const { bank, expectedAccounts } of testCases) {
      cleanup();
      renderWithTable(<BankAccountRow bank={bank} />);

      // Check the name of the bank
      expect(screen.getByText(bank.label)).toBeInTheDocument();

      // Find and click the expand button
      const expandButton = screen.getByTestId(
        `expand-bank-accounts-button-${bank.id}`,
      );
      fireEvent.click(expandButton);

      // Wait and verify that all reports are done
      await waitFor(async () => {
        if (bank.bankAccounts) {
          // Check account numbers
          const accountNumbers = await screen.findAllByText(
            (_content, element) => {
              return element?.textContent?.startsWith("N°") || false;
            },
          );
          expect(accountNumbers).toHaveLength(expectedAccounts);

          // Check account names
          bank.bankAccounts.forEach((acc) => {
            if (acc) {
              expect(screen.getByText(acc.name)).toBeInTheDocument();
            }
          });

          // check balances
          bank.bankAccounts.forEach((acc) => {
            if (acc) {
              expect(screen.getByText(`${acc.balance} €`)).toBeInTheDocument();
            }
          });
        }
      });
    }
  });

  it("devrait afficher et masquer les détails lors du clic sur le bouton", async () => {
    const bank = bankA;
    renderWithTable(<BankAccountRow bank={bank} />);

    // Check that the details are initially hidden
    if (bank.bankAccounts?.[0]) {
      expect(
        screen.queryByText(`N° ${bank.bankAccounts[0].account_number}`),
      ).not.toBeInTheDocument();

      // click to show
      const expandButton = screen.getByTestId(
        `expand-bank-accounts-button-${bank.id}`,
      );
      fireEvent.click(expandButton);

      // Check that details are displayed
      await waitFor(() => {
        expect(
          screen.getByText(`N° ${bank.bankAccounts![0].account_number}`),
        ).toBeInTheDocument();
      });

      // Click to hide
      fireEvent.click(expandButton);

      // Check that details are hidden
      await waitFor(() => {
        expect(
          screen.queryByText(`N° ${bank.bankAccounts![0].account_number}`),
        ).not.toBeInTheDocument();
      });
    }
  });
});
