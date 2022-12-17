import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import mysql from "mysql";
// import myconn from "express-myconnection";

import { routerCrypto } from "./routes";
import { INewError } from "type";
import dotenv from "dotenv";

dotenv.config();

const {
  PORT = 5000,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_HOST,
  // INSTANCE_CONNECTION_NAME,
} = process.env;

export const pool = mysql.createPool({
  host: DB_HOST,
  port: 3306,
  user: DB_NAME,
  password: DB_PASSWORD,
  database: DB_USER,
});
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/crypto", routerCrypto);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err: INewError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
