import axios from "axios";

import { ICoinPaprika } from "type";

const URL = "https://api.coinpaprika.com/v1/tickers";

export let trend: string[] = [];

export const coinPaprika = async () => {
  trend = [];
  try {
    const { data } = await axios.get<ICoinPaprika[]>(URL, {
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });

    const date = Date.now();

    let recentMax = 20;

    const prise = data.map((x, i) => {
      const symbol = x.symbol;

      if (i < recentMax) {
        if (trend.includes(symbol)) {
          recentMax += 1;
        } else {
          trend.push(symbol);
        }
      }

      const step = x.quotes.USD.percent_change_24h / 24;
      return {
        name: x.name,
        prise: x.quotes.USD.price,
        symbol: symbol,
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
