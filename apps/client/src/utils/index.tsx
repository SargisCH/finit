export const currencyFormat = (amount: number | string, isInt = false) => {
  const formatted = new Intl.NumberFormat("am-HY", {
    style: "currency",
    currency: "AMD",
    maximumFractionDigits: 0,
  })
    .format(Number(amount))
    .toString();
  console.log("firnmatted", formatted);
  const [, numberValue] = formatted.split(/\u00A0|\s/);
  return numberValue;
};
