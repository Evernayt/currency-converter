import { Link } from "react-router-dom";
import { currencies } from "../../constants/currencies";
import { CONVERTER_ROUTE } from "../../constants/paths";
import getObjectValueByKey from "../../helpers/getObjectValueByKey";
import { useAppSelector } from "../../hooks/redux";
import { ICurrency } from "../../models/ICurrency";
import styles from "./ExchangeRatesPage.module.css";

const ExchangeRatesPage = () => {
  const rates = useAppSelector((state) => state.exchangeRate.rates);
  const mainCurrency = useAppSelector(
    (state) => state.exchangeRate.mainCurrency
  );

  const getCurrencies = (): ICurrency[] => {
    if (!rates) return [];

    const result: ICurrency[] = [];
    const currenciesWithoutMain = currencies.filter(
      (x) => x.code !== mainCurrency.code
    );
    for (let index = 0; index < currenciesWithoutMain.length; index++) {
      const currency = currenciesWithoutMain[index];
      const rate = getObjectValueByKey(rates, currency.code);
      const mainRate = 1 / rate;
      result.push({ ...currency, rate: mainRate });
    }

    return result;
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <Link className="link" to={CONVERTER_ROUTE}>
          Back to converter
        </Link>
        {getCurrencies().map((currency) => (
          <div className={styles.currency_rate} key={currency.code}>{`1 ${
            currency.name
          } = ${currency.rate.toFixed(2)} ${mainCurrency.name}`}</div>
        ))}
      </div>
    </div>
  );
};

export default ExchangeRatesPage;
