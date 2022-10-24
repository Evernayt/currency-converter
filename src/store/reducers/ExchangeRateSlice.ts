import { IRates } from "./../../models/IRates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICurrency } from "../../models/ICurrency";
import getLocaleCurrency from "../../helpers/getLocaleCurrency";
import { currencies } from "../../constants/currencies";

const localeCurrencyCode = getLocaleCurrency();
const defaultMainCurrency =
  currencies.find((x) => x.code === localeCurrencyCode) || currencies[0];
const defaultSecondaryCurrency =
  defaultMainCurrency.code !== "USD" ? currencies[1] : currencies[0];

type ExchangeRateState = {
  rates: IRates | null;
  mainCurrency: ICurrency;
  secondaryCurrency: ICurrency;
};

const initialState: ExchangeRateState = {
  rates: null,
  mainCurrency: defaultMainCurrency,
  secondaryCurrency: defaultSecondaryCurrency,
};

export const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {
    setRatesAction(state, action: PayloadAction<IRates>) {
      state.rates = action.payload;
    },
    setMainCurrencyAction(state, action: PayloadAction<ICurrency>) {
      state.mainCurrency = action.payload;
    },
    setSecondaryCurrencyAction(state, action: PayloadAction<ICurrency>) {
      state.secondaryCurrency = action.payload;
    },
  },
});

export const {
  setRatesAction,
  setMainCurrencyAction,
  setSecondaryCurrencyAction,
} = exchangeRateSlice.actions;

export default exchangeRateSlice.reducer;
