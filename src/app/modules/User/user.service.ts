import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();
const createAdminforDb = async (paylood: any) => {
  if (!paylood.password) {
    throw new Error("password is not found");
  }
  const hasPassword = await bcrypt.hash(paylood.password, 10);
  if (!hasPassword) {
    throw new Error("bcrypt solt generated problem");
  }
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: paylood?.admin?.email,
    },
  });
  console.log(isUserExist);

  if (isUserExist) {
    throw new Error("user already exist in databes");
  }
  const userData = {
    email: paylood.admin.email,
    password: hasPassword,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });
    const createdAdmin = await transactionClient.admin.create({
      data: paylood.admin,
    });

    return createdAdmin;
  });
  return result;
};
const getAllUserForDb = async () => {
  const result = await prisma.user.findMany({});
  return result;
};

export const userServices = {
  createAdminforDb,
  getAllUserForDb,
};
