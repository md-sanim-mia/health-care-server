import express from "express";
import { userRouters } from "../modules/User/user.router";
import { adminRouters } from "../modules/admin/admin.router";
import { authRouters } from "../modules/Auth/auth.route";
import { doctorRouters } from "../modules/doctor/doctor.route";

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
  {
    path: "/auth",
    route: authRouters,
  },
  {
    path: "/doctors",
    route: doctorRouters,
  },
];

modulesRouters.forEach((item) => router.use(item.path, item.route));

export default router;
