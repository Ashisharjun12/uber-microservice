import dotenv from "dotenv";

dotenv.config();

const { PORT, JWT_SECRET, DATABASE_URI } = process.env;

export const _config = {
  PORT,
  JWT_SECRET,
  DATABASE_URI,
};
