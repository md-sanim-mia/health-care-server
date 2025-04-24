import { Prisma } from "@prisma/client";
import prisma from "../../utils/prisma";
import { paginationHelper } from "../../utils/paginationHelper";

const getAllDoctorForDb = async (paylood: any, options: any) => {
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

export const doctorService = {
  getAllDoctorForDb,
};
