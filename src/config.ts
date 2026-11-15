import 'dotenv/config';
import { z } from 'zod';

const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    DB_HOST: z.string().default('127.0.0.1'),
    DB_PORT: z.coerce.number().default(3307),
    DB_USER: z.string(),
    DB_PASSWORD: z.string(),
    DB_NAME: z.string(),
  })
  .parse(process.env);

export const config = env;
