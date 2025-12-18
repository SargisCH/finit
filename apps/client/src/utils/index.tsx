export const currencyFormat = (amount: number | string, isInt = false) => {
  const formatted = new Intl.NumberFormat("am-HY", {
    style: "currency",
    currency: "AMD",
  }).format(Number(amount));
  if (isInt) {
    const [currency, value] = formatted.split(/\u00A0|\s/);
    const aa = formatted.split(" ");
    return `${currency} ${parseInt(value)}`;
  }
  return formatted;
};
