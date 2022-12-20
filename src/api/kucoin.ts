import axios from "axios";
import { dataCorrection } from "helpers";
import { IKucoin, TData } from "type";

const URL = "https://api.kucoin.com/api/v1/prices";

export const kucoin = async () => {
  try {
    const {
      data: { data },
    } = await axios.get<IKucoin>(URL);

    const prise: TData[] = await dataCorrection(data, "kucoin");

    return prise;
  } catch (error) {
    throw error;
  }
};
