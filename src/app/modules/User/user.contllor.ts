import { asyncCatch } from "../../utils";
import { userServices } from "./user.service";

const createUser = asyncCatch(async (req, res) => {
  const result = await userServices.createAdminforDb(req);
  res.status(200).send({
    success: true,
    message: "user succcess fully created",
    data: result,
  });
});
const createDoctor = asyncCatch(async (req, res) => {
  const result = await userServices.createDoctorforDb(req);
  res.status(200).send({
    success: true,
    message: "doctor succcess fully created",
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
const cheangeProfileStatus = asyncCatch(async (req, res) => {
  const { userId } = req.params;
  const result = await userServices.cheangeProfileStatus(userId, req.body);
  res.status(200).send({
    success: true,
    message: "success fully cheange profile status ",
    data: result,
  });
});

export const useContllors = {
  createUser,
  getAllUser,
  createDoctor,
  cheangeProfileStatus,
};
