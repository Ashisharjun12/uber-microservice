import { sql } from "drizzle-orm";
import { uuid, pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 20 }).notNull(),
  email: varchar("email", { length: 50 }).unique().notNull(),
  password: varchar("password", { length: 60 }).notNull(),
  role: varchar("role", { length: 12 }).notNull().default("user"),
  refreshToken: varchar("refresh_token", { length: 1000 }),
  createdAt: timestamp("created_at", {withTimezone:true}).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", {withTimezone:true}).defaultNow().notNull(),
});
