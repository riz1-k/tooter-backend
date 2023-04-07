import { z } from 'zod';

const userRegisterValidator = z.object({
  username: z.string().min(3).max(20),
  displayName: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(6).max(50),
  dob: z.coerce.date().max(new Date()),
  phoneNumber: z.string().length(10),
});

const userLoginValidator = z.object({
  usernameOrEmail: z.string().min(3).max(50),
  password: z.string().min(6).max(50),
});

type TypeUserRegisterValidator = z.infer<typeof userRegisterValidator>;
type TypeUserLoginValidator = z.infer<typeof userLoginValidator>;

export { userLoginValidator, userRegisterValidator };
export type { TypeUserLoginValidator, TypeUserRegisterValidator };
