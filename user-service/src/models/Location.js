import { uuid, pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { user } from "./User.js";


export const location = pgTable("locations", {
  id: uuid("id").primaryKey().defaultRandom(),
  pickUpLocation: text("pick_up_location").notNull(),
  dropLocation: text("drop_location").notNull(),
  userId: uuid("user_id").references(()=>user.id , {onDelete:'cascade'}).notNull(),
  createdAt:timestamp("created_at", {withTimezone:true}).defaultNow().notNull(),
  updatedAt:timestamp("updated_at", {withTimezone:true}).defaultNow().notNull(),
});





