import Express from "express";
import { RequestCustom } from "./ctrlWrapper";

export type TRouterFn = (
  req: RequestCustom,
  res: Express.Response,
  next?: Express.NextFunction
) => any | void;
