import { Prisma, UserStatus } from "@prisma/client";
import prisma from "../../utils/prisma";
import { paginationHelper } from "../../utils/paginationHelper";

const getAllAdminForDb = async (paylood: any, options: any) => {
  const { searchTerm, ...filterData } = paylood;
  const searchQuery: Prisma.AdminWhereInput[] = [];
  const { skip, limit, page } = paginationHelper.calculatePagination(options);
  if (paylood?.searchTerm) {
    searchQuery.push({
      OR: ["name", "email"].map((fild) => ({
        [fild]: {
          name: {
            contains: paylood?.searchTerm,
            mode: "insensitive",
          },
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    searchQuery.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equls: filterData[key],
        },
      })),
    });
  }
  searchQuery.push({ isDeleted: false });
  const whereCondition: Prisma.AdminWhereInput = { AND: searchQuery };
  const result = await prisma.admin.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });
  const totallPage = await prisma.admin.count({ where: whereCondition });
  return {
    meta: { page, limit, totallPage },
    data: result,
  };
};
const getSingleAdminForDb = async (id: string) => {
  const result = await prisma.admin.findUnique({ where: { id: id } });
  return result;
};
const updatedSingleAdminForDb = async (id: string, paylood: any) => {
  const result = await prisma.admin.update({
    where: { id: id, isDeleted: false },
    data: paylood,
  });
  return result;
};
const deletedSingleAdminForDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({ where: { id: id } });
  const result = await prisma.$transaction(async (transactionClient) => {
    const deleteAdmin = await transactionClient.admin.update({
      where: { id: id },
      data: { isDeleted: true },
    });
    const deleteAdminUser = await transactionClient.user.update({
      where: { id: id },
      data: { status: UserStatus.BLOCKED },
    });
    return deleteAdmin;
  });
  return result;
};
export const adminServices = {
  getAllAdminForDb,
  getSingleAdminForDb,
  updatedSingleAdminForDb,
  deletedSingleAdminForDb,
};
