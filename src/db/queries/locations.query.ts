import { eq, ilike } from 'drizzle-orm'

import { db } from '../index'
import { InsertLocation, locations, SelectLocation } from '../schema'

export async function createLocation(data: InsertLocation) {
  const result = await db.insert(locations).values(data).returning()
  return result[0]
}

export async function getAllLocations() {
  return await db.select().from(locations)
}

export async function getLocationById(id: SelectLocation['id']) {
  const result = await db.select().from(locations).where(eq(locations.id, id))
  return result[0]
}

export async function getLocationsByCategory(category: string) {
  return await db.select().from(locations).where(eq(locations.category, category))
}

export async function searchLocations(searchTerm: string) {
  return await db
    .select()
    .from(locations)
    .where(ilike(locations.name, `%${searchTerm}%`))
}

export async function updateLocation(id: SelectLocation['id'], data: Partial<Omit<SelectLocation, 'id'>>) {
  const result = await db.update(locations).set(data).where(eq(locations.id, id)).returning()
  return result[0]
}

export async function deleteLocation(id: SelectLocation['id']) {
  const result = await db.delete(locations).where(eq(locations.id, id)).returning()
  return result[0]
}
