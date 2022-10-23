import { FC, useId, useRef, useState, useEffect } from "react";
import { currencies } from "../../constants/currencies";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { ICurrency } from "../../models/ICurrency";
import styles from "./CurrencyInput.module.css";

interface CurrencyInputProps {
  value: number;
  onValueChange: (value: number) => void;
  defaultCurrency: ICurrency;
  changeHandler: (currency: ICurrency, index: number) => void;
  disabled?: boolean;
}

const CurrencyInput: FC<CurrencyInputProps> = ({
  value,
  onValueChange,
  defaultCurrency,
  changeHandler,
  disabled,
  ...props
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [selectedCurrency, setSelectedCurrency] =
    useState<ICurrency>(defaultCurrency);

  const selectBtnRef = useRef<HTMLDivElement>(null);

  const id = useId();

  useOnClickOutside(selectBtnRef, () => setIsHidden(true));

  useEffect(() => {
    if (defaultCurrency.code !== selectedCurrency.code) {
      setSelectedCurrency(defaultCurrency);
    }
  }, [defaultCurrency.code]);

  const selectCurrency = (currency: ICurrency, index: number) => {
    setIsHidden(true);
    setSelectedCurrency(currency);
    changeHandler(currency, index);
  };

  return (
    <div
      className={styles.container}
      style={{ pointerEvents: disabled ? "none" : "auto" }}
    >
      <input
        className={styles.textbox}
        type="number"
        min={0}
        value={value}
        onChange={(e) => onValueChange(Number(e.target.value))}
      />
      <div className={styles.select_container} ref={selectBtnRef} {...props}>
        <div
          className={styles.select_btn}
          style={{ pointerEvents: disabled ? "none" : "auto" }}
          onClick={() => setIsHidden((prevState) => !prevState)}
        >
          <img src={selectedCurrency.flag} />
          {selectedCurrency.code}
        </div>
        <ul
          className={styles.menu}
          style={{ display: isHidden ? "none" : "block" }}
        >
          {currencies.map((currency, index) => {
            const currencyId = id + currency.code;
            return (
              <li key={currency.code}>
                <input
                  className={styles.input}
                  id={currencyId}
                  name="currency_select_btn"
                  type="radio"
                  checked={selectedCurrency.code === currency.code}
                  onChange={() => selectCurrency(currency, index)}
                />
                <label className={styles.item} htmlFor={currencyId}>
                  <img src={currency.flag} />
                  {currency.code}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CurrencyInput;
