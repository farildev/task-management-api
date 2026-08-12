import dotenv from "dotenv";
import {z} from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  DB_HOST: z.string(),
  DB_PORT: z.string().default('5432'),
  DB_NAME: z.string(),
  DB_USER: z.string(),
  DB_PASSWORD: z.string().default(''),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

const parsed = envSchema.safeParse(process.env);

if(!parsed.success){
  console.error('Error happened!');
  console.error(parsed.error.issues);
  process.exit(1);
}

export const env = {
  port: parseInt(parsed.data.PORT),
  nodeEnv: parsed.data.NODE_ENV,
  db: {
    host: parsed.data.DB_HOST,
    port: parseInt(parsed.data.DB_PORT),
    name: parsed.data.DB_NAME,
    user: parsed.data.DB_USER,
    password: parsed.data.DB_PASSWORD,
  },
  jwt: {
    secret: parsed.data.JWT_SECRET,
    expiresIn: parsed.data.JWT_EXPIRES_IN,
  },
}
