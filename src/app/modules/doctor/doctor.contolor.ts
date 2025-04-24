import { asyncCatch } from "../../utils";
import pick from "../../utils/pick";
import { doctorService } from "./doctor.service";

const getAllDoctor = asyncCatch(async (req, res) => {
  const filters = pick(req.query, ["email", "name", "searchTerm"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await doctorService.getAllDoctorForDb(filters, options);
  res.status(200).send({
    success: true,
    message: "doctors  succcess fully get ",
    metaData: result.meta,
    data: result.data,
  });
});

export const doctorController = {
  getAllDoctor,
};
