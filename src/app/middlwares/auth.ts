import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncCatch } from "../utils";
import config from "../config/config";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prisma";
import { UserStatus } from "@prisma/client";

const auth = (...userRole: string[]) => {
  return asyncCatch(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you ar not authorized");
    }

    const decode = jwt.verify(token, config.jwt_scrict as string);
    if (!decode) {
      throw new AppError(StatusCodes.FORBIDDEN, "you ar not authorized");
    }

    const { email, role } = decode as JwtPayload;

    const statusCheck = await prisma.user.findUnique({
      where: { email: email, role: role },
    });
    if (statusCheck?.status === UserStatus.BLOCKED) {
      throw new AppError(StatusCodes.BAD_REQUEST, "you ar not authorized");
    }
    if (userRole.length && !userRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, "you ar not authorized");
    }
    console.log(decode);
    req.user = decode as JwtPayload;

    next();
  });
};

export default auth;
