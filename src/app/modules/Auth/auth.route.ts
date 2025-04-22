import express from "express";
import { authContllors } from "./auth.contllors";
import auth from "../../middlwares/auth";
import { UserRole } from "@prisma/client";
const route = express.Router();

route.post("/login", authContllors.logingUser);
route.post("/refesh-token", authContllors.refeshToken);
route.post(
  "/cheange-password",
  auth(
    UserRole.ADMIN,
    UserRole.DOCTOR,
    UserRole.USER,
    UserRole.SUPER_ADMIN,
    UserRole.PATIENT
  ),
  authContllors.chengePassword
);
route.post("/forget-password", authContllors.forgetPassword);
route.post("/reset-password", authContllors.resetPassword);

export const authRouters = route;
