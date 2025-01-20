  import { uuid, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { user } from "./User.js";
import { location } from "./Location.js";

export const profile = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  bio: text("bio").notNull(),
  profileImage: text("profile_image"),
  userId: uuid("user_id").references(()=>user.id , {onDelete:'cascade'}),
  locationId:uuid("location_id").references(()=>location.id , {onDelete:'cascade'} ),
  updatedAt: varchar("updated_at").default(sql`CURRENT_TIMESTAMP`),
  createdAt: varchar("created_at").default(sql`CURRENT_TIMESTAMP`),
});
