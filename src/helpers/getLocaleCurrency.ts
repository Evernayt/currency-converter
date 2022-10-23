import LocaleCurrency from "locale-currency";

const getLocaleCurrency = (): string => {
  const lang = navigator.language;
  return LocaleCurrency.getCurrency(lang);
};

export default getLocaleCurrency;
