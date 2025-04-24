import express, { NextFunction, Request, Response } from "express";
import { useContllors } from "./user.contllor";
import { fileUploder } from "../../utils/fileUploder";
import { v2 as cloudinary } from "cloudinary";
import auth from "../../middlwares/auth";
import { UserRole } from "@prisma/client";
const route = express.Router();

route.post(
  "/",
  fileUploder.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body);
    next();
  },
  useContllors.createUser
);
route.post(
  "/create-doctor",
  fileUploder.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body);
    next();
  },
  useContllors.createDoctor
);
route.patch(
  "/:userId",
  auth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  useContllors.cheangeProfileStatus
);
route.get("/", useContllors.getAllUser);

export const userRouters = route;
