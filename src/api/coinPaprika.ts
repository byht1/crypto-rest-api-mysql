import axios from "axios";

import { ICoinPaprika } from "type";

const URL = "https://api.coinpaprika.com/v1/tickers";

export const trend: string[] = [];

export const coinPaprika = async () => {
  try {
    const { data } = await axios.get<ICoinPaprika[]>(URL, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    const date = Date.now();

    const prise = data.map((x, i) => {
      if (i < 5) {
        trend.push(x.symbol);
      }

      const step = x.quotes.USD.percent_change_24h / 24;
      return {
        name: x.name,
        prise: x.quotes.USD.price,
        symbol: x.symbol,
        "1h": x.quotes.USD.percent_change_1h,
        "4h": Number((step * 4).toFixed(2)),
        "24h": x.quotes.USD.percent_change_24h,
        api: "coinPaprika",
        date,
      };
    });

    return prise;
  } catch (error) {
    throw error;
  }
};
