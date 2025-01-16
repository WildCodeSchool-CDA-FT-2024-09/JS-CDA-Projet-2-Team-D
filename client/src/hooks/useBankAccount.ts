import { useGetBanksQuery, Bank, BankAccount } from "../types/graphql-types";

export const useBankAccounts = () => {
  const { data, loading, error } = useGetBanksQuery();

  const banks: Bank[] =
    data?.getBanks.map((bank) => ({
      id: bank.id,
      label: bank.label,
      bankAccounts:
        bank.bankAccounts?.map((bankAccount: BankAccount) => ({
          id: bankAccount.id,
          name: bankAccount.name,
          account_number: bankAccount.account_number,
          balance: bankAccount.balance,
          bank: {
            id: bank.id,
            label: bank.label,
            bankAccounts: [],
          },
        })) ?? [],
    })) ?? [];

  return {
    banks,
    loading,
    error,
  };
};
