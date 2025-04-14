import express from "express";
import { userRouters } from "../modules/User/user.router";
import { adminRouters } from "../modules/admin/admin.router";

const router = express.Router();
const modulesRouters = [
  {
    path: "/users",
    route: userRouters,
  },
  {
    path: "/admins",
    route: adminRouters,
  },
];

modulesRouters.forEach((item) => router.use(item.path, item.route));

export default router;
