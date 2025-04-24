import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { fileUploder } from "../../utils/fileUploder";
import { Request } from "express";
const prisma = new PrismaClient();
const createAdminforDb = async (req: Request) => {
  console.log(req.body, req.file);
  const paylood = req.body;
  if (req.file) {
    const uploadCloudinary = await fileUploder.uploadToCloudinary(req.file);
    console.log(uploadCloudinary);
    paylood.admin.profilePotho = uploadCloudinary?.secure_url;
  }

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
const createDoctorforDb = async (req: Request) => {
  const paylood = req.body;
  if (req.file) {
    const uploadCloudinary = await fileUploder.uploadToCloudinary(req.file);
    console.log(uploadCloudinary);
    paylood.admin.profilePotho = uploadCloudinary?.secure_url;
  }

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
    email: paylood.doctor.email,
    password: hasPassword,
    role: UserRole.DOCTOR,
    status: UserStatus.ACTIVE,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    const createdUser = await transactionClient.user.create({
      data: userData,
    });
    const createDoctor = await transactionClient.admin.create({
      data: paylood.doctor,
    });

    return createDoctor;
  });
  return result;
};
const getAllUserForDb = async () => {
  const result = await prisma.user.findMany({
    select: {
      email: true,
      createdAt: true,
      id: true,
      role: true,
      status: true,
      updatedAt: true,
    },
  });
  return result;
};

const cheangeProfileStatus = async (userId: string, paylood: UserRole) => {
  const result = await prisma.user.update({
    where: { id: userId },
    data: paylood,
  });
  return result;
};

export const userServices = {
  createAdminforDb,
  getAllUserForDb,
  createDoctorforDb,
  cheangeProfileStatus,
};
