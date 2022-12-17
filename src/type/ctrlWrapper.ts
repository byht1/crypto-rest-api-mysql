import Express from "express";

export interface RequestCustom extends Express.Request {
  //   userIP?: { decimal: number; ip: string };
}

export type TCtrlWrapperFunc = (
  req: RequestCustom,
  res: Express.Response,
  next: Express.NextFunction
) => void;
