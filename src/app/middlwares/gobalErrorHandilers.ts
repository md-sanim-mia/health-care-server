import { NextFunction, Request, Response } from "express";

const gobalErrorHandiler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = 500;
  const message = err?.message || "somthing waent wrong";
  res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
};

export default gobalErrorHandiler;
