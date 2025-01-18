import postgres from "postgres";
import { _config } from "./config.js";
import { drizzle } from "drizzle-orm/postgres-js";
import logger from "../utils/logger.js";

const queryString = _config.DATABASE_URI;

export const connection = postgres(queryString);

export const db = drizzle(connection);

// export const db = async () => {
//   try {
//     const db = drizzle(connection);
//     logger.info(`Database connected successfully at  PORT ${queryString}`);
//     return db;
//   } catch (error) {
//     logger.error("Database connection failed", error);
//     throw error;
//   }
// };


