import { z } from 'zod';

const validateEmployeeRegister = z.object({
  email: z.string().email('Invalid email'),
  fullName: z
    .string()
    .min(3, 'Full name must be at least 3 characters')
    .max(20, 'Full name must be at most 20 characters'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters'),
});

const validateEmployeeLogin = z.object({
  email: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters'),
});

type TypeEmployeeRegisterBody = z.infer<typeof validateEmployeeRegister>;
type TypeEmployeeLoginBody = z.infer<typeof validateEmployeeLogin>;

export type { TypeEmployeeLoginBody, TypeEmployeeRegisterBody };
export { validateEmployeeLogin, validateEmployeeRegister };
