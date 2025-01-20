CREATE TABLE "profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"bio" text NOT NULL,
	"user_id" integer,
	"updated_at" varchar DEFAULT CURRENT_TIMESTAMP,
	"created_at" varchar DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
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
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;