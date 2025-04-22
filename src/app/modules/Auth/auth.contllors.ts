import { asyncCatch } from "../../utils";
import sendResponse from "../../utils/send.response";
import { authServices } from "./auth.service";
const logingUser = asyncCatch(async (req, res) => {
  const result = await authServices.logingUserForDb(req.body);
  res.cookie("refeshToken", result.refeshToken, {
    secure: false,
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user succes fully loging ",
    data: {
      accessToken: result.accessToken,
    },
  });
});

const refeshToken = asyncCatch(async (req, res) => {
  const token = req.cookies.refeshToken;
  const result = await authServices.refeshTokenForDb(token);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "get success fully refesh token ",
    data: result,
  });
});
const chengePassword = asyncCatch(async (req, res) => {
  const { email } = req.user;
  const result = await authServices.chengePasswordForDb(email, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "get success fully cheange password ",
  });
});
const forgetPassword = asyncCatch(async (req, res) => {
  const result = await authServices.forgetPasswordForDb(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "forget password link succes fully send please check  ",
  });
});
const resetPassword = asyncCatch(async (req, res) => {
  const token = req.headers.authorization || "";
  const result = await authServices.resetPasswordForDb(token, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "success fully reset your password",
  });
});

export const authContllors = {
  logingUser,
  refeshToken,
  chengePassword,
  forgetPassword,
  resetPassword,
};
