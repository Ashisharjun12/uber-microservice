CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text NOT NULL,
	"user_id" integer,
	"updated_at" varchar DEFAULT CURRENT_TIMESTAMP,
	"created_at" varchar DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;