import express from "express";
import { useContllors } from "./user.contllor";
const route = express.Router();

route.post("/", useContllors.createUser);

export const userRouters = route;
