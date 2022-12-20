import { pool, tableName } from "app";
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

  const query = `INSERT INTO ${tableName} (name, prise, symbol, 1h, 4h, 24h, api, date ) value ?`;
  // const query = `INSERT INTO ${tableName} (name, prise, symbol, 1h, 4h, 24h, api, date ) value(?, ?, ?, ?, ?, ?, ?, ?)`;

  await pool.query(`TRUNCATE TABLE  ${tableName}`);

  pool.query(query, [data.map((x) => Object.values(x))], (error) => {
    if (error) return console.log(error);
  });

  return data;
};
