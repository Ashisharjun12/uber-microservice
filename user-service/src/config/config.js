import dotenv from "dotenv";

dotenv.config();

const { PORT, REDIS_URL, JWT_SECRET, DATABASE_URI , REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET} = process.env;

export const _config = {
  PORT,
  REDIS_URL,
  JWT_SECRET,
  DATABASE_URI,
  REFRESH_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET
};
  