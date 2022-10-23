import { IRates } from "./../../models/IRates";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ExchangeRateState = {
  rates: IRates | null;
};

const initialState: ExchangeRateState = {
  rates: null,
};

export const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {
    setRates(state, action: PayloadAction<IRates>) {
      state.rates = action.payload;
    },
  },
});

export const { setRates } = exchangeRateSlice.actions;

export default exchangeRateSlice.reducer;
