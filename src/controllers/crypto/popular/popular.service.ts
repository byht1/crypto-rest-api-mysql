import { currencyCryptoData } from "api";
import { TData, TDataAverage, TNormalAverageValue, TResetData } from "type";

export const resetData: TResetData = async (date, fn, req, res) => {
  const oneMinute = 60 * 1000;

  if (!date) {
    await currencyCryptoData();
    fn(req, res);
    return true;
  }

  const differenceTime = Math.ceil((Date.now() - date) / oneMinute);

  if (differenceTime > 15) {
    await currencyCryptoData();
    fn(req, res);
    return true;
  }

  return false;
};

export const averageValue = (data: TData[]) => {
  const normalDate = data.reduce<TNormalAverageValue>(
    (acc, x) => {
      acc[x.api].push(x);

      return acc;
    },
    {
      coinBase: [],
      coinMarketCap: [],
      coinPaprika: [],
      coinStats: [],
      kucoin: [],
    }
  );

  const average: TDataAverage[] = [];

  const dataCoinPaprika = normalDate.coinPaprika; // True
  const dataCoinBase = normalDate.coinBase;
  const dataCoinMarketCap = normalDate.coinMarketCap;
  const dataCoinStats = normalDate.coinStats;
  const dataKucoin = normalDate.kucoin;

  for (const el of dataCoinPaprika) {
    let elCMC = dataCoinMarketCap.find((x) => x.symbol === el.symbol);
    let elCP = dataCoinBase.find((x) => x.symbol === el.symbol);
    let elCS = dataCoinStats.find((x) => x.symbol === el.symbol);
    let elK = dataKucoin.find((x) => x.symbol === el.symbol);

    if (!elCMC) {
      elCMC = el;
    }
    if (!elCP) {
      elCP = el;
    }
    if (!elCS) {
      elCS = el;
    }
    if (!elK) {
      elK = el;
    }

    const averagePrise =
      (el.prise + elCMC.prise + elCP.prise + elCS.prise + elK.prise) / 5;

    const average1h = averageHouse(
      el["1h"],
      el["1h"],
      el["1h"],
      el["1h"],
      el["1h"]
    );

    const average4h = averageHouse(
      el["4h"],
      el["4h"],
      el["4h"],
      el["4h"],
      el["4h"]
    );

    const average24h = averageHouse(
      el["24h"],
      el["24h"],
      el["24h"],
      el["24h"],
      el["24h"]
    );

    const newOdj: TDataAverage = {
      ...el,
      prise: averagePrise,
      "1h": average1h,
      "4h": average4h,
      "24h": average24h,
    };

    delete newOdj.api;

    average.push(newOdj);

    // delete average.api
  }

  return average;
};

function averageHouse(
  v1: number | null,
  v2: number | null,
  v3: number | null,
  v4: number | null,
  v5: number | null
) {
  let average = 0;
  let averageStep = 0;
  if (v1) {
    average += v1;
    averageStep += 1;
  }
  if (v2) {
    average += v2;
    averageStep += 1;
  }
  if (v3) {
    average += v3;
    averageStep += 1;
  }
  if (v4) {
    average += v4;
    averageStep += 1;
  }
  if (v5) {
    average += v5;
    averageStep += 1;
  }

  return average / averageStep;
}
