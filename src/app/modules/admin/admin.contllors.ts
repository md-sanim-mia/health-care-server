import { asyncCatch } from "../../utils";
import pick from "../../utils/pick";
import { adminServices } from "./admin.service";

const getAllAdmin = asyncCatch(async (req, res) => {
  const filters = pick(req.query, ["email", "name", "searchTerm"]);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await adminServices.getAllAdminForDb(filters, options);
  res.status(200).send({
    success: true,
    message: "admin succcess fully get ",
    metaData: result.meta,
    data: result.data,
  });
});
const getSingleAdmin = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.getSingleAdminForDb(id);
  res.status(200).send({
    success: true,
    message: "success fully get single admin  ",
    data: result,
  });
});
const updatedSingleAdmin = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.updatedSingleAdminForDb(id, req.body);
  res.status(200).send({
    success: true,
    message: "success fully updated single admin  ",
    data: result,
  });
});
const deletedSingleAdmin = asyncCatch(async (req, res) => {
  const { id } = req.params;
  const result = await adminServices.deletedSingleAdminForDb(id);
  res.status(200).send({
    success: true,
    message: "success fully deleted single admin  ",
    data: result,
  });
});
export const adminContllors = {
  getAllAdmin,
  getSingleAdmin,
  updatedSingleAdmin,
  deletedSingleAdmin,
};
