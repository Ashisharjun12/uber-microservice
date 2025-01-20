import { uuid, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./User.js";

export const location = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  PickUpLocation: text("pick_up_location").notNull(),
  DropLocation: text("drop_location").notNull(),
  userId: uuid("user_id").references(()=>user.id , {onDelete:'cascade'}),
  updatedAt: varchar("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: varchar("created_at").default(sql`CURRENT_TIMESTAMP`),
});
