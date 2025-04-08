import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/router";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.get("", (req: Request, res: Response) => {
  res.send({
    message: "ph health care",
  });
});

app.use("/api/v1", router);
export default app;
