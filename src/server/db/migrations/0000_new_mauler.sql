CREATE TABLE IF NOT EXISTS "jobsearch_job_titles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(100) NOT NULL,
	"pdl_count" integer NOT NULL,
	"related_skills" text[],
	"related_titles" text[],
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "title_idx" ON "jobsearch_job_titles" USING btree ("title");