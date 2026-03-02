CREATE TABLE "itineraries" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"trip_data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "locations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"latitude" real NOT NULL,
	"longitude" real NOT NULL,
	"image_url" text,
	"category" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE INDEX "itineraries_user_id_idx" ON "itineraries" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "itineraries_created_at_idx" ON "itineraries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "locations_name_idx" ON "locations" USING btree ("name");--> statement-breakpoint
CREATE INDEX "locations_category_idx" ON "locations" USING btree ("category");