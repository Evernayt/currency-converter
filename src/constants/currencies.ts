import { ICurrency } from "../models/ICurrency";
import RUB from "../icons/flags/RUB.svg";
import USD from "../icons/flags/USD.svg";
import EUR from "../icons/flags/EUR.svg";
import CHF from "../icons/flags/CHF.svg";
import GBP from "../icons/flags/GBP.svg";
import JPY from "../icons/flags/JPY.svg";
import UAH from "../icons/flags/UAH.svg";
import KZT from "../icons/flags/KZT.svg";
import BYN from "../icons/flags/BYN.svg";
import TRY from "../icons/flags/TRY.svg";
import CNY from "../icons/flags/CNY.svg";
import PLN from "../icons/flags/PLN.svg";

export const currencies: ICurrency[] = [
  {
    code: "RUB",
    flag: RUB,
    rate: 0,
    name: "Russian Ruble",
  },
  {
    code: "USD",
    flag: USD,
    rate: 0,
    name: "United States Dollar",
  },
  {
    code: "EUR",
    flag: EUR,
    rate: 0,
    name: "Euro",
  },
  {
    code: "CHF",
    flag: CHF,
    rate: 0,
    name: "Swiss Franc",
  },
  {
    code: "GBP",
    flag: GBP,
    rate: 0,
    name: "Pound Sterling",
  },
  {
    code: "JPY",
    flag: JPY,
    rate: 0,
    name: "Japanese Yen",
  },
  {
    code: "UAH",
    flag: UAH,
    rate: 0,
    name: "Ukrainian Hryvnia",
  },
  {
    code: "KZT",
    flag: KZT,
    rate: 0,
    name: "Kazakhstani Tenge",
  },
  {
    code: "BYN",
    flag: BYN,
    rate: 0,
    name: "Belarusian Ruble",
  },
  {
    code: "TRY",
    flag: TRY,
    rate: 0,
    name: "Turkish Lira",
  },
  {
    code: "CNY",
    flag: CNY,
    rate: 0,
    name: "Chinese Renminbi",
  },
  {
    code: "PLN",
    flag: PLN,
    rate: 0,
    name: "Polish Złoty",
  },
];
