import { Request, Response } from "express";
import { TRouterFn } from "type";

export type TResetData = (
  date: number,
  fn: TRouterFn,
  req: Request,
  res: Response
) => Promise<boolean>;
