import { sql } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
  email: varchar("email", { length: 50 }).unique().notNull(),
  password: varchar("password", { length: 60 }).notNull(),
  role: varchar("role", { length: 12 }).notNull().default("user"),
  refreshToken: varchar("refresh_token", { length: 1000 }),
  updatedAt: varchar("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: varchar("created_at").default(sql`CURRENT_TIMESTAMP`),
});