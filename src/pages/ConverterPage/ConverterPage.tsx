import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CurrencyInput, IconButton, Loader, Textbox } from "../../components";
import { TextboxIconVariants } from "../../components/UI/Textbox/Textbox";
import { currencies } from "../../constants/currencies";
import { EXCHANGE_RATES_ROUTE } from "../../constants/paths";
import getLocaleCurrency from "../../helpers/getLocaleCurrency";
import getObjectValueByKey from "../../helpers/getObjectValueByKey";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchExchangeRateAPI } from "../../http/exchangeRateAPI";
import { IconArrowRight, IconArrowsExchange } from "../../icons";
import { ICurrency } from "../../models/ICurrency";
import { IRates } from "../../models/IRates";
import {
  setMainCurrencyAction,
  setRatesAction,
  setSecondaryCurrencyAction,
} from "../../store/reducers/ExchangeRateSlice";
import styles from "./ConverterPage.module.css";

// const localeCurrencyCode = getLocaleCurrency();
// const defaultMainCurrency =
//   currencies.find((x) => x.code === localeCurrencyCode) || currencies[0];
// const defaultSecondaryCurrency =
//   defaultMainCurrency.code !== "USD" ? currencies[1] : currencies[0];

const ConverterPage = () => {
  const [text, setText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [mainValue, setMainValue] = useState<number>(0);
  const [secondaryValue, setSecondaryValue] = useState<number>(0);
  // const [secondaryCurrency, setSecondaryCurrency] = useState<ICurrency>(
  //   defaultSecondaryCurrency
  // );
  const [loading, setLoading] = useState<boolean>(true);

  const rates = useAppSelector((state) => state.exchangeRate.rates);
  const mainCurrency = useAppSelector(
    (state) => state.exchangeRate.mainCurrency
  );
  const secondaryCurrency = useAppSelector(
    (state) => state.exchangeRate.secondaryCurrency
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetchExchangeRateAPI(mainCurrency.code, controller.signal)
      .then((data) => {
        dispatch(setRatesAction(data.rates));

        const mainRate = getObjectValueByKey(data.rates, mainCurrency.code);
        dispatch(setMainCurrencyAction({ ...mainCurrency, rate: mainRate }));

        const secondaryRate = getObjectValueByKey(
          data.rates,
          secondaryCurrency.code
        );
        dispatch(
          setSecondaryCurrencyAction({
            ...secondaryCurrency,
            rate: secondaryRate,
          })
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!errorMessage) return;

    const timerId = setTimeout(() => setErrorMessage(""), 3600);
    return () => clearInterval(timerId);
  }, [errorMessage]);

  const mainValueChangeHandler = (value: number, secondaryRate: number) => {
    setMainValue(value);

    const secondaryValue = Number((value * secondaryRate).toFixed(2));
    setSecondaryValue(secondaryValue);
  };

  const secondaryValueChangeHandler = (
    value: number,
    mainRate: number,
    secondaryRate: number
  ) => {
    setSecondaryValue(value);

    const realMainRate = mainRate / secondaryRate;
    const mainValue = Number((value * realMainRate).toFixed(2));
    setMainValue(mainValue);
  };

  const mainCurrencyChangeHandler = (
    mainCurrency: ICurrency,
    secondaryCurrency: ICurrency
  ): Promise<IRates> => {
    return new Promise((resolve) => {
      setLoading(true);
      fetchExchangeRateAPI(mainCurrency.code)
        .then((data) => {
          resolve(data.rates);
          dispatch(setRatesAction(data.rates));

          const mainRate = getObjectValueByKey(data.rates, mainCurrency.code);
          dispatch(setMainCurrencyAction({ ...mainCurrency, rate: mainRate }));

          secondaryCurrencyChangeHandler(
            data.rates,
            secondaryCurrency,
            mainValue
          );
        })
        .finally(() => setLoading(false));
    });
  };

  const secondaryCurrencyChangeHandler = (
    rates: IRates | null,
    currency: ICurrency,
    mainValue: number
  ) => {
    if (!rates) return;
    const secondaryRate = getObjectValueByKey(rates, currency.code);
    const secondaryValue = Number((mainValue * secondaryRate).toFixed(2));
    setSecondaryValue(secondaryValue);
    dispatch(setSecondaryCurrencyAction({ ...currency, rate: secondaryRate }));
  };

  const swap = () => {
    const newMainCurrency = secondaryCurrency;
    const newSecondaryCurrency = mainCurrency;

    setLoading(true);
    fetchExchangeRateAPI(newMainCurrency.code)
      .then((data) => {
        dispatch(setRatesAction(data.rates));

        const mainRate = getObjectValueByKey(data.rates, newMainCurrency.code);
        dispatch(setMainCurrencyAction({ ...newMainCurrency, rate: mainRate }));

        const secondaryRate = getObjectValueByKey(
          data.rates,
          newSecondaryCurrency.code
        );
        const secondaryValue = Number((mainValue * secondaryRate).toFixed(2));
        setSecondaryValue(secondaryValue);
        dispatch(
          setSecondaryCurrencyAction({
            ...newSecondaryCurrency,
            rate: secondaryRate,
          })
        );
      })
      .finally(() => setLoading(false));
  };

  const convert = () => {
    const numbers = text
      .split(/[^0-9,.,\,]/g)
      .filter((token) => token.match(/[0-9]/));

    const words = text
      .split(/([a-zA-Z]+)/)
      .filter((token) => token.match(/[a-zA-Z]/));

    if (numbers.length === 0) {
      setErrorMessage("Need to write a value");
      return;
    } else if (words.length < 2) {
      setErrorMessage("You need to write currency codes");
      return;
    }

    let newMainCurrency;
    let newSecondaryCurrency;

    for (let index = 0; index < words.length; index++) {
      const word = words[index].toUpperCase();
      const currency = currencies.find((x) => word.includes(x.code));
      if (currency) {
        if (!newMainCurrency) {
          newMainCurrency = currency;
        } else if (!newSecondaryCurrency) {
          newSecondaryCurrency = currency;
          break;
        } else {
          break;
        }
      }
    }

    if (newMainCurrency && newSecondaryCurrency) {
      const newMainValue = Number(numbers[0]);
      const secondaryCode = newSecondaryCurrency.code;
      mainCurrencyChangeHandler(newMainCurrency, newSecondaryCurrency).then(
        (data) => {
          const secondaryRate = getObjectValueByKey(data, secondaryCode);
          mainValueChangeHandler(newMainValue, secondaryRate);

          setErrorMessage("");
          setText("");
        }
      );
    } else {
      setErrorMessage("You need to write correct currency codes");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1>💱</h1>
          <h1>Currency Converter</h1>
        </div>

        <div className={styles.input_container}>
          {errorMessage && (
            <div className={styles.error_message}>{errorMessage}</div>
          )}
          <Textbox
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Eg. 15 USD in RUB"
            icon={<IconArrowRight color="white" />}
            iconVariant={TextboxIconVariants.primary}
            onIconClick={convert}
            onKeyDown={(e) => e.key === "Enter" && convert()}
            disabled={loading}
          />
        </div>
        <div className={styles.currency_inputs_container}>
          <CurrencyInput
            value={mainValue}
            onValueChange={(value) =>
              mainValueChangeHandler(value, secondaryCurrency.rate)
            }
            defaultCurrency={mainCurrency}
            changeHandler={(currency) =>
              mainCurrencyChangeHandler(currency, secondaryCurrency)
            }
            disabled={loading}
          />
          {loading ? (
            <Loader />
          ) : (
            <IconButton icon={<IconArrowsExchange />} onClick={swap} />
          )}
          <CurrencyInput
            value={secondaryValue}
            onValueChange={(value) =>
              secondaryValueChangeHandler(
                value,
                mainCurrency.rate,
                secondaryCurrency.rate
              )
            }
            defaultCurrency={secondaryCurrency}
            changeHandler={(currency) =>
              secondaryCurrencyChangeHandler(rates, currency, mainValue)
            }
            disabled={loading}
          />
        </div>
        <div className={styles.currency_rate}>{`${mainCurrency.rate} ${
          mainCurrency.name
        } = ${secondaryCurrency.rate.toFixed(2)} ${
          secondaryCurrency.name
        }`}</div>
        <Link className="link" to={EXCHANGE_RATES_ROUTE}>
          Exchange rates relative to the base
        </Link>
      </div>
    </div>
  );
};

export default ConverterPage;
