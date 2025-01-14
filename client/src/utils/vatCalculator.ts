export const calculateAmountWithVAT = (
  priceWithoutVAT: number,
  vatRate: number,
): number => {
  const amount = priceWithoutVAT + (priceWithoutVAT * vatRate) / 100;
  return Number.isFinite(amount) ? amount : 0;
};
