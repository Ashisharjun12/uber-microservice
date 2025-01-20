import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./User.js";

export const profile = pgTable("profiles", {
  id: serial("id").primaryKey(),
  bio: text("bio").notNull(),
  userId: integer("user_id").references(()=>user.id),
  updatedAt: varchar("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: varchar("created_at").default(sql`CURRENT_TIMESTAMP`),
});
