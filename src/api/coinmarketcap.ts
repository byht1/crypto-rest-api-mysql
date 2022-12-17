import axios from "axios";
import dotenv from "dotenv";

import { nameCrypto } from "helpers";
import { ICoinmarketcap, TData } from "type";

dotenv.config();

const { CMC_PRO_API_KEY } = process.env;

const serverCMC = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com",
  headers: {
    "X-CMC_PRO_API_KEY": CMC_PRO_API_KEY,
  },
});

export const coinmarketcap = async () => {
  try {
    const {
      data: { data },
    } = await serverCMC.get<ICoinmarketcap>(
      "/v1/cryptocurrency/listings/latest"
    );

    const nameDate = await nameCrypto;
    const date = Date.now();

    const prise = data.reduce<TData[]>((acc, x) => {
      const name = nameDate.get(x.symbol);

      if (!name) return acc;

      const step = x.quote.USD.percent_change_24h / 24;
      acc.push({
        name,
        prise: x.quote.USD.price,
        symbol: x.symbol,
        "1h": x.quote.USD.percent_change_1h,
        "4h": Number((step * 4).toFixed(2)),
        "24h": x.quote.USD.percent_change_24h,
        api: "coinMarketCap",
        date,
      });

      return acc;
    }, []);

    return prise;
  } catch (error) {
    throw error;
  }
};

// const prise = data.filter((x) => {
//       const name = nameCrypto[x.symbol];

//       if (!name) return;

//       const step = x.quote.USD.percent_change_24h / 24;
//       return {
//         name,
//         symbol: x.symbol,
//         prise: x.quote.USD.price,
//         "1h": x.quote.USD.percent_change_1h,
//         "4h": Number((step * 4).toFixed(2)),
//         "24h": x.quote.USD.percent_change_24h,
//         date: Date.now(),
//       };
//     });
