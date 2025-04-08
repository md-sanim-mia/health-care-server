import { NextFunction, Request, RequestHandler, Response } from "express";

export const asyncCatch = (fan: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fan(req, res, next)).catch((err) => next(err));
  };
};
