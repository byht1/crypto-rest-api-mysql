import { currencyCryptoData } from "api";
import { pool, tableName } from "app";
import { TData, TRouterFn } from "type";
import { averageValue, resetData } from "../popular/popular.service";

export const currencyName: TRouterFn = async (req, res) => {
  const { name } = req.params;
  const { apiName } = req.query;

  const query = `SELECT * FROM ${tableName} WHERE symbol = ? ${
    apiName ? `AND api = "${apiName}"` : ""
  }`;

  pool.query(query, name.toUpperCase(), async (err, result) => {
    if (err) throw err;

    const el: TData = result[0] ?? { date: 0 };

    if (!el) {
      await currencyCryptoData();
    }

    const isNeedUpdateData = await resetData(el.date, currencyName, req, res);

    if (isNeedUpdateData) return;

    const averageResult = apiName ? result : averageValue(result);

    res.status(201).json(averageResult);
  });
};
