import { uuid, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./User.js";
import { location } from "./Location.js";


export const profile = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  bio: text("bio").notNull(),
  profileImage: text("profile_image"),
  userId: uuid("user_id").references(()=>user.id , {onDelete:'cascade'}),
  locationId:uuid("location_id").references(()=>location.id , {onDelete:'cascade'} ),
  createdAt:timestamp("created_at", {withTimezone:true}).defaultNow().notNull(),
  updatedAt:timestamp("updated_at", {withTimezone:true}).defaultNow().notNull(),
});


