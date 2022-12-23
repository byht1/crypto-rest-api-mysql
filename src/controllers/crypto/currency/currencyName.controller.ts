import { createError } from "./../../../helpers/createError";
import { currencyCryptoData } from "api";
import { pool, tableName } from "app";
import { TData, TRouterFn } from "type";
import { averageValue, resetData } from "../popular/popular.service";

export const currencyName: TRouterFn = async (req, res) => {
  const { name } = req.params;
  const { apiName } = req.query;

  if (!name) createError(400, "Валюта не вказана");

  const arrName = name.split(",").map((x) => x.toLocaleUpperCase());
  console.log("🚀  arrName", arrName);

  const query = `SELECT * FROM ${tableName} WHERE symbol = ? ${
    arrName[1]
      ? arrName.reduce((acc, x, i) => {
          if (i === 0) return acc;

          acc += `OR symbol = ?`;

          return acc;
        }, "")
      : ""
  } ${apiName ? `AND api = "${apiName}"` : ""}`;
  console.log("🚀  query", query);
  // ${arrName[0]}

  pool.query(query, arrName, async (err, result) => {
    console.log("🚀  result", result);
    if (err) throw createError(500);

    if (!result[0]) {
      res
        .status(400)
        .json({ message: "Вибачте але ми не знайшли такої валюти" });
      return;
    }

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
