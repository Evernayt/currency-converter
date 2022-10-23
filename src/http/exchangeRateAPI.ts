import { IExchangeRate } from "../models/IExchangeRate";
import { $host } from "./index";

export const fetchExchangeRateAPI = async (
  code: string,
  signal?: AbortSignal
): Promise<IExchangeRate> => {
  const { data } = await $host.get("latest/" + code, { signal });
  return data;
};
