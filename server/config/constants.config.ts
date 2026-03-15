import dotenv from "dotenv";
import type { StringValue } from "ms";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const PORT = Number(process.env.PORT) || 8000;

const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",").map((o) => o.trim()) ?? [
  "http://localhost:3000",
];

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRY_TIME: StringValue = (process.env.JWT_EXPIRY_TIME || "7d") as StringValue;

const ALLOWED_USER_ROLES = ["ADMIN", "USER"];
const AUTH_PROVIDERS = ["GOOGLE", "GITHUB", "EMAIL"];
const SMTP = {
  user: process.env.EMAIL_USER,
  pass: process.env.EMAIL_PASS,
  port: process.env.SMTP_PORT,
};

const REDIS_URL = process.env.REDIS_URL;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const DOMAIN = process.env.DOMAIN;

export {
  NODE_ENV,
  PORT,
  ALLOWED_ORIGINS,
  JWT_SECRET,
  JWT_EXPIRY_TIME,
  ALLOWED_USER_ROLES,
  AUTH_PROVIDERS,
  SMTP,
  REDIS_URL,
  RESEND_API_KEY,
  DOMAIN,
};
