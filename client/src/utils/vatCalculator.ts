export const calculateAmountWithVAT = (
  priceWithoutVAT: number | undefined,
  vatRate: number | undefined,
): number => {
  const price = Number(priceWithoutVAT);
  const rate = Number(vatRate);

  if (!Number.isFinite(price) || !Number.isFinite(rate)) {
    return 0;
  }

  const amount = price + (price * rate) / 100;
  return Number.isFinite(amount) ? amount : 0;
};
