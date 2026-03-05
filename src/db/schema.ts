import { index, jsonb, pgTable, real, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'

// Locations table for storing tourist destinations in An Giang
export const locations = pgTable(
  'locations',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    description: text('description'),
    latitude: real('latitude').notNull(),
    longitude: real('longitude').notNull(),
    image_url: text('image_url'),
    category: varchar('category', { length: 50 }).notNull()
  },
  (table) => [index('locations_name_idx').on(table.name), index('locations_category_idx').on(table.category)]
)

// Itineraries table for storing user trip plans
export const itineraries = pgTable(
  'itineraries',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    title: text('title').notNull(),
    tripData: jsonb('trip_data').notNull(), // JSON data for trip details
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow()
  },
  (table) => [
    index('itineraries_user_id_idx').on(table.userId),
    index('itineraries_created_at_idx').on(table.createdAt)
  ]
)

// Type inference for TypeScript
export type InsertLocation = typeof locations.$inferInsert
export type SelectLocation = typeof locations.$inferSelect

export type InsertItinerary = typeof itineraries.$inferInsert
export type SelectItinerary = typeof itineraries.$inferSelect
