import express from "express";
import { userRouters } from "../modules/User/user.router";

const router = express.Router();
const modulesRouters = [
  {
    path: "/users",
    route: userRouters,
  },
];

modulesRouters.forEach((item) => router.use(item.path, item.route));

export default router;
