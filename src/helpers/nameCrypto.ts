import * as fs from "fs/promises";
import path from "path";

const URL_DB = "../../db/cruptoName.json";

const urlPath = path.join(__dirname, URL_DB);
const failDBName = fs.readFile(urlPath, { encoding: "utf8" });

const name = async () => {
  const names = await failDBName;

  return new Map<string, string>(JSON.parse(names));
};

export const nameCrypto = name();
