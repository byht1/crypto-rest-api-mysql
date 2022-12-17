import { currencyCryptoData } from "api";
import { trend } from "api/coinPaprika";
import { pool } from "app";
import { TData, TRouterFn } from "type";
import { resetData, averageValue } from "./popular.service";

export const trendDefault: string[] = ["BTC", "ETH", "USDT", "USDC", "BNB"];

export const crypto: TRouterFn = async (req, res) => {
  const { apiName } = req.query;
  const queryTrend = trend.length ? trend : trendDefault;
  const query = `SELECT * FROM crypto16 WHERE symbol = ? OR symbol = ? OR symbol = ? OR symbol = ? OR symbol = ? ${
    apiName ? `AND api = "${apiName}"` : ""
  }`;
  // const query = `SELECT * FROM crypto15 WHERE symbol = "${trend[0]}" OR symbol = "${trend[1]}" OR symbol = "${trend[2]}" OR symbol = "${trend[3]}" OR symbol = "${trend[4]}"`;

  pool.query(query, queryTrend, async (err, result) => {
    if (err) throw err;

    const el: TData = result[0];

    if (!el) {
      await currencyCryptoData();
    }

    const isNeedUpdateData = await resetData(el.date, crypto, req, res);

    if (isNeedUpdateData) return;

    const averageResult = apiName ? result : averageValue(result);

    res.status(201).json(averageResult);
  });
};
