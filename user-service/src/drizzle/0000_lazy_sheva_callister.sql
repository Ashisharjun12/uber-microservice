CREATE TABLE "locations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pick_up_location" text NOT NULL,
	"drop_location" text NOT NULL,
	"user_id" uuid,
	"updated_at" varchar DEFAULT CURRENT_TIMESTAMP,
	"created_at" varchar DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"bio" text NOT NULL,
	"profile_image" text,
	"user_id" uuid,
	"location_id" uuid,
	"updated_at" varchar DEFAULT CURRENT_TIMESTAMP,
	"created_at" varchar DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(20) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(60) NOT NULL,
	"role" varchar(12) DEFAULT 'user' NOT NULL,
	"refresh_token" varchar(1000),
	"updated_at" varchar DEFAULT CURRENT_TIMESTAMP,
	"created_at" varchar DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;