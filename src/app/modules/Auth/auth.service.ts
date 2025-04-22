import config from "../../config/config";
import { createToken } from "../../utils/createToken";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../../utils/prisma";
import { TLoging } from "./auth.interface";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { UserStatus } from "@prisma/client";
import emailSender from "./sendEmail";
const logingUserForDb = async (paylood: TLoging) => {
  const isExistUser = await prisma.user.findFirst({
    where: { email: paylood.email, status: "ACTIVE" },
  });

  if (!isExistUser) {
    throw new Error("Invilide email or password please try agin");
  }

  const checkPassword = await bcrypt.compare(
    paylood?.password,
    isExistUser?.password
  );

  if (!checkPassword) {
    throw new Error("Invilide email or password please try agin");
  }
  const jwtPayload = {
    email: isExistUser.email,
    role: isExistUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_scrict as string,
    "3d"
  );
  const refeshToken = createToken(
    jwtPayload,
    config.jwt_refesh_scrict as string,
    "60d"
  );

  const result = {
    accessToken,
    refeshToken,
  };
  return result;
};
const refeshTokenForDb = async (paylood: string) => {
  const decode = jwt.verify(paylood, config.jwt_refesh_scrict as string);

  const { email, role } = decode as JwtPayload;
  if (!decode) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "you ar not authorized");
  }
  const isExistUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!isExistUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, "you ar not authorized");
  }
  if (isExistUser.status === UserStatus.BLOCKED) {
    throw new AppError(StatusCodes.FORBIDDEN, "you ar not authorized");
  }
  const jwtPayload = {
    email: isExistUser.email,
    role: isExistUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_scrict as string,
    "3d"
  );
  return {
    accessToken,
  };
};

const chengePasswordForDb = async (
  email: string,
  paylood: { newPassword: string; oldPassword: string }
) => {
  const isExistUser = await prisma.user.findUnique({ where: { email: email } });

  if (!isExistUser) {
    throw new AppError(StatusCodes.BAD_REQUEST, "you ar not authorized");
  }
  if (isExistUser.status === UserStatus.BLOCKED) {
    throw new AppError(StatusCodes.BAD_REQUEST, "you are already bolcked");
  }
  const checkPassword = await bcrypt.compare(
    paylood?.oldPassword,
    isExistUser?.password
  );

  if (!checkPassword) {
    throw new Error("Invilide old password please try agin");
  }
  const hasPassword = await bcrypt.hash(paylood.newPassword, 10);
  if (!hasPassword) {
    throw new Error("password solt generate problem ");
  }
  const result = await prisma.user.update({
    where: { email: email },
    data: { password: hasPassword },
  });
  console.log(result);
  return result;
};

const forgetPasswordForDb = async (paylood: { email: string }) => {
  const userData = await prisma.user.findUnique({
    where: { email: paylood.email },
  });
  if (!userData) {
    throw new Error("Invilide email please try agin");
  }
  if (userData.status === UserStatus.BLOCKED) {
    throw new Error("your account already blocked ");
  }
  const jwtPayload = {
    email: userData.email,
    role: userData.role,
  };
  const resestPasswordToken = createToken(
    jwtPayload,
    config.jwt_scrict as string,
    "5m"
  );
  const adminData = await prisma.admin.findUnique({
    where: { email: userData.email },
  });
  const resetPasswordLink = `http://localhost:3000/reset-password?userId=${userData.id}&token=${resestPasswordToken}`;
  console.log(resetPasswordLink);
  const result = await emailSender(
    userData.email,
    `
    <div>
    <h2>
    Hell, Dear ${adminData?.name}
    </h2>
      <p> your reset password link
       <a href=${resetPasswordLink}>
 <button>
 reset password
 </button>
       </a>
      </p>
    </div>
    `
  );

  return resestPasswordToken;
};

const resetPasswordForDb = async (
  token: string,
  paylood: {
    password: string;
  }
) => {
  if (!token) {
    throw new AppError(StatusCodes.NOT_FOUND, "token is not found ");
  }

  const verifyToken = jwt.verify(token, config.jwt_scrict as string);
  if (!verifyToken) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      "forbidden access for your request "
    );
  }
  const { email, role } = verifyToken as JwtPayload;
  const isExistUser = await prisma.user.findUnique({
    where: { email: email, status: UserStatus.ACTIVE },
  });
  if (!isExistUser) {
    throw new AppError(StatusCodes.NOT_FOUND, "user is not fuond");
  }

  const hasPassword = await bcrypt.hash(paylood.password, 10);
  if (!hasPassword) {
    throw new AppError(StatusCodes.NOT_FOUND, "bcrypt solt generate problem");
  }
  const result = await prisma.user.update({
    where: { email: email },
    data: { password: hasPassword },
  });
  return result;
};
export const authServices = {
  logingUserForDb,
  refeshTokenForDb,
  chengePasswordForDb,
  resetPasswordForDb,
  forgetPasswordForDb,
};
