import { configureStore } from "@reduxjs/toolkit";
import ExchangeRateSlice from "./reducers/ExchangeRateSlice";

const store = configureStore({
  reducer: {
    exchangeRate: ExchangeRateSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
