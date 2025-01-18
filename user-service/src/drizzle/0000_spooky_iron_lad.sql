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
