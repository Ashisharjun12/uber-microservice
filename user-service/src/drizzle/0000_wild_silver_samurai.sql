CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstname" varchar(20) NOT NULL,
	"lastname" varchar(20) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(60) NOT NULL,
	"image" text,
	"role" varchar(12) DEFAULT 'user' NOT NULL,
	"updated_at" varchar DEFAULT CURRENT_TIMESTAMP,
	"created_at" varchar DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
