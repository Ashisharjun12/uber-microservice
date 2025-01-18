import { sql } from "drizzle-orm";
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: serial("id").primaryKey(),
  firstname: varchar("firstname", { length: 20 }).notNull(),
  lastname: varchar("lastname", { length: 20 }).notNull(),
  email: varchar("email", { length: 50 }).unique().notNull(),
  password: varchar("password", { length: 60 }).notNull(),
  image: text("image"),
  role: varchar("role", { length: 12 }).notNull().default("user"),
  updatedAt: varchar("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: varchar("created_at").default(sql`CURRENT_TIMESTAMP`),
});