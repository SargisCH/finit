export const currencyFormat = (amount: number | string) => {
  return new Intl.NumberFormat("am-HY", {
    style: "currency",
    currency: "AMD",
  }).format(Number(amount));
};
