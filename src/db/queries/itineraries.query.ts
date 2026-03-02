import { desc, eq } from 'drizzle-orm'

import { db } from '../index'
import { InsertItinerary, itineraries, SelectItinerary } from '../schema'

export async function createItinerary(data: InsertItinerary) {
  const result = await db.insert(itineraries).values(data).returning()
  return result[0]
}

export async function getAllItineraries() {
  return await db.select().from(itineraries).orderBy(desc(itineraries.createdAt))
}

export async function getItineraryById(id: SelectItinerary['id']) {
  const result = await db.select().from(itineraries).where(eq(itineraries.id, id))
  return result[0]
}

export async function getItinerariesByUserId(userId: string) {
  return await db.select().from(itineraries).where(eq(itineraries.userId, userId)).orderBy(desc(itineraries.createdAt))
}

export async function updateItinerary(id: SelectItinerary['id'], data: Partial<Omit<SelectItinerary, 'id'>>) {
  const result = await db.update(itineraries).set(data).where(eq(itineraries.id, id)).returning()
  return result[0]
}

export async function deleteItinerary(id: SelectItinerary['id']) {
  const result = await db.delete(itineraries).where(eq(itineraries.id, id)).returning()
  return result[0]
}
