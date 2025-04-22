import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
import gobalErrorHandiler from "./app/middlwares/gobalErrorHandilers";
import notfound from "./app/middlwares/not.found";
import cookieParser from "cookie-parser";
const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "ph health care",
  });
});

app.use("/api/v1", router);
app.use(gobalErrorHandiler);
app.use(notfound);
export default app;
