import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notfound = (req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).send({
    success: false,
    message: "Api is not found",
    error: {
      path: req.originalUrl,
      message: "your request path is not found",
    },
  });
};

export = notfound;
