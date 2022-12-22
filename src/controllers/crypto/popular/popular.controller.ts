import { currencyCryptoData } from "api";
import { trend } from "api/coinPaprika";
import { pool, tableName } from "app";
import { TData, TRouterFn } from "type";
import { averageValue, resetData } from "./popular.service";

export const trendDefault: string[] = ["BTC", "ETH", "USDT", "USDC", "BNB"];

export const crypto: TRouterFn = async (req, res) => {
  const { apiName } = req.query;
  const queryTrend = trend.length ? trend : trendDefault;

  const query = `SELECT * FROM ${tableName} WHERE symbol = ? ${queryTrend.reduce(
    (acc, x, i) => {
      if (i === 0) return acc;

      acc += "OR symbol = ?";

      return acc;
    },
    ""
  )} ${apiName ? `AND api = "${apiName}"` : ""}`;

  pool.query(query, queryTrend, async (err, result) => {
    if (err) throw err;

    const el: TData = result[0] ?? { date: 0 };

    if (!el) {
      await currencyCryptoData();
    }

    const isNeedUpdateData = await resetData(el.date, crypto, req, res);

    if (isNeedUpdateData) return;

    const averageResult = apiName ? result : averageValue(result);

    res.status(201).json(averageResult);
  });
};
