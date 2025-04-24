import express from "express";
import auth from "../../middlwares/auth";
import { UserRole } from "@prisma/client";
import { doctorController } from "./doctor.contolor";
const route = express.Router();
route.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  doctorController.getAllDoctor
);
export const doctorRouters = route;
