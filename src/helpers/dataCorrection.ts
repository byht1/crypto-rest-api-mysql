import { TApiName } from "type";
import { nameCrypto } from "./nameCrypto";

export const dataCorrection = async (dataServer: any, api: TApiName) => {
  const nameDate = await nameCrypto;
  const date = Date.now();
  const data = [];

  const key = Object.keys(dataServer);
  const values = Object.values(dataServer);

  for (let i = 0; i < key.length; i += 1) {
    const k = key[i];

    const name = nameDate.get(k);

    if (!name) continue;

    const element = {
      name,
      prise: api === "kucoin" ? Number(values[i]) : 1 / Number(values[i]),
      symbol: k,
      "1h": null,
      "4h": null,
      "24h": null,
      api,
      date,
    };

    data.push(element);
  }

  return data;
};
