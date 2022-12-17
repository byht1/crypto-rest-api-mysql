import { pool } from "app";
import { coinbase } from "./coinbase";
import { coinmarketcap } from "./coinmarketcap";
import { coinPaprika } from "./coinPaprika";
import { coinStats } from "./coinStats";
import { kucoin } from "./kucoin";

export const currencyCryptoData = async () => {
  const data = await Promise.all([
    coinPaprika(),
    coinStats(),
    coinbase(),
    coinmarketcap(),
    kucoin(),
  ]).then((res) => [...res[0], ...res[1], ...res[2], ...res[3], ...res[4]]);

  const query =
    "INSERT INTO crypto16 (name, prise, symbol, 1h, 4h, 24h, api, date ) value(?, ?, ?, ?, ?, ?, ?, ?)";

  await pool.query("TRUNCATE TABLE  crypto15");

  for (let i = 0; i < data.length; i++) {
    pool.query(query, Object.values(data[i]), (error) => {
      if (error) return console.log(error);
    });
  }

  return data;
};
