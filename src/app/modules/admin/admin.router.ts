import express from "express";
import { adminContllors } from "./admin.contllors";
const route = express.Router();
route.get("/", adminContllors.getAllAdmin);
route.get("/:id", adminContllors.getSingleAdmin);
route.patch("/:id", adminContllors.updatedSingleAdmin);
route.delete("/:id", adminContllors.updatedSingleAdmin);

export const adminRouters = route;
