import { TCtrlWrapperFunc, TRouterFn } from "type";

export const ctrlWrapper = (ctrl: TRouterFn) => {
  const func: TCtrlWrapperFunc = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return func;
};
