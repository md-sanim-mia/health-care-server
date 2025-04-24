import { z } from "zod";

const userValidationSchema = z.object({
  body: z.object({
    password: z.string({ required_error: "password is requred" }),
    admin: z.object({
      name: z.string({ required_error: "name is requred" }),
      email: z.string({ required_error: "name is requred" }),
      contactNumber: z.string({ required_error: "name is requred" }),
    }),
  }),
});
