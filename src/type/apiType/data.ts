export type TData = {
  name: string;
  prise: number;
  symbol: string;
  "1h": number | null;
  "4h": number | null;
  "24h": number | null;
  api: TApiName;
  date: number;
};

export type TDataAverage = {
  name: string;
  prise: number;
  symbol: string;
  "1h": number | null;
  "4h": number | null;
  "24h": number | null;
  api?: TApiName;
  date: number;
};

export type TApiName =
  | "coinBase"
  | "coinMarketCap"
  | "coinPaprika"
  | "coinStats"
  | "kucoin";

// enum EApiName {
//   coinBase = "coinBase",
//   coinMarketCap = "coinMarketCap",
//   coinPaprika = "coinPaprika",
//   coinStats = "coinStats",
//   kucoin = "kucoin",
// }

export type TNormalAverageValue = {
  coinBase: TData[];
  coinMarketCap: TData[];
  coinPaprika: TData[];
  coinStats: TData[];
  kucoin: TData[];
};
