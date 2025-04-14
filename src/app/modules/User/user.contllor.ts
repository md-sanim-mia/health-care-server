import { asyncCatch } from "../../utils";
import { userServices } from "./user.service";

const createUser = asyncCatch(async (req, res) => {
  const result = await userServices.createAdminforDb(req.body);
  res.status(200).send({
    success: true,
    message: "user succcess fully created",
    data: result,
  });
});
const getAllUser = asyncCatch(async (req, res) => {
  const result = await userServices.getAllUserForDb();
  res.status(200).send({
    success: true,
    message: "user succcess fully get ",
    data: result,
  });
});

export const useContllors = {
  createUser,
  getAllUser,
};
