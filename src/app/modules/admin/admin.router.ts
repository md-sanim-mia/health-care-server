import express from "express";
import { adminContllors } from "./admin.contllors";
import auth from "../../middlwares/auth";
import { UserRole } from "@prisma/client";
const route = express.Router();
route.get(
  "/",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  adminContllors.getAllAdmin
);
route.get("/:id", adminContllors.getSingleAdmin);
route.patch("/:id", adminContllors.updatedSingleAdmin);
route.delete("/:id", adminContllors.updatedSingleAdmin);

export const adminRouters = route;
