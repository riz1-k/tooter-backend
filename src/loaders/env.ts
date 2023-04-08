import { config } from 'dotenv';
import { z } from 'zod';

import formatErrors from '../utils/formatErrors';

config();

const allowedOrigins: string[] = ['http://localhost:3000'];

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DATABASE_URL: z.string(),
  PORT: z.number(),
  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_ACCESS_KEY: z.string(),
  WASABI_ACCESS_KEY: z.string(),
  WASABI_SECRET_ACCESS_KEY: z.string(),
  WASABI_BUCKET_NAME: z.string(),
});

const envs = {
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  PORT: Number(process.env.PORT),
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  WASABI_ACCESS_KEY: process.env.WASABI_ACCESS_KEY,
  WASABI_SECRET_ACCESS_KEY: process.env.WASABI_SECRET_ACCESS_KEY,
  WASABI_BUCKET_NAME: process.env.WASABI_BUCKET_NAME,
};

const serverEnv = envSchema.safeParse(envs);

const verifyEnv = () => {
  if (!serverEnv.success) {
    console.error(
      '❌ Invalid environment variables:\n',
      ...formatErrors(serverEnv.error.format())
    );
    throw new Error('Invalid environment variables');
  }
};

if (!serverEnv.success) {
  process.exit(1);
}

const env = serverEnv.data;

export { allowedOrigins, verifyEnv };
export default env;
