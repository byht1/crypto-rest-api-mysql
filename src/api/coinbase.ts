import axios from "axios";
import { dataCorrection } from "helpers";
import { ICoinbase, TData } from "type";


const URL = "https://api.coinbase.com/v2/exchange-rates";

export const coinbase = async () => {
  try {
    const {
      data: {
        data: { rates },
      },
    } = await axios.get<ICoinbase>(URL);

    const prise: TData[] = await dataCorrection(rates, "coinBase");

    return prise;
  } catch (error) {
    throw error;
  }
};
