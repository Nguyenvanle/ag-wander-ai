import { eq } from 'drizzle-orm'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { db } from '../db'
import { itineraries, locations } from '../db/schema'
import { seedDatabase } from '../db/seed'

describe('Database Operations', () => {
  beforeAll(async () => {
    // Seed database before tests
    await seedDatabase()
  })

  afterAll(async () => {
    // Clean up after tests
    await db.delete(itineraries)
    await db.delete(locations)
  })

  describe('Locations', () => {
    it('should retrieve all locations', async () => {
      const allLocations = await db.select().from(locations)
      expect(allLocations).toHaveLength(5)
      expect(allLocations[0]).toHaveProperty('name')
      expect(allLocations[0]).toHaveProperty('category')
    })

    it('should retrieve locations by category', async () => {
      const natureLocations = await db.select().from(locations).where(eq(locations.category, 'nature'))

      expect(natureLocations).toHaveLength(2)
      expect(natureLocations.every((loc) => loc.category === 'nature')).toBe(true)
    })

    it('should retrieve a specific location by name', async () => {
      const [nuicam] = await db.select().from(locations).where(eq(locations.name, 'Núi Cấm'))

      expect(nuicam).toBeDefined()
      expect(nuicam.name).toBe('Núi Cấm')
      expect(nuicam.latitude).toBe(10.3519)
      expect(nuicam.longitude).toBeCloseTo(105.0867, 3)
    })

    it('should have valid coordinates for all locations', async () => {
      const allLocations = await db.select().from(locations)

      allLocations.forEach((location) => {
        expect(location.latitude).toBeGreaterThanOrEqual(-90)
        expect(location.latitude).toBeLessThanOrEqual(90)
        expect(location.longitude).toBeGreaterThanOrEqual(-180)
        expect(location.longitude).toBeLessThanOrEqual(180)
      })
    })
  })

  describe('Itineraries', () => {
    it('should retrieve all itineraries', async () => {
      const allItineraries = await db.select().from(itineraries)
      expect(allItineraries).toHaveLength(2)
      expect(allItineraries[0]).toHaveProperty('userId')
      expect(allItineraries[0]).toHaveProperty('tripData')
    })

    it('should retrieve itineraries by user ID', async () => {
      const userItineraries = await db.select().from(itineraries).where(eq(itineraries.userId, 'user123'))

      expect(userItineraries).toHaveLength(1)
      expect(userItineraries[0].title).toBe('Tour 2 ngày khám phá An Giang')
    })

    it('should have valid trip data structure', async () => {
      const [itinerary] = await db.select().from(itineraries)

      expect(itinerary.tripData).toBeDefined()
      expect(typeof itinerary.tripData).toBe('object')
      const tripData = itinerary.tripData as any
      expect(tripData).toHaveProperty('duration')
      expect(tripData).toHaveProperty('locations')
      expect(tripData).toHaveProperty('budget')
      expect(Array.isArray(tripData.locations)).toBe(true)
    })

    it('should have creation and update timestamps', async () => {
      const [itinerary] = await db.select().from(itineraries)

      expect(itinerary.createdAt).toBeDefined()
      expect(itinerary.updatedAt).toBeDefined()
      expect(itinerary.createdAt).toBeInstanceOf(Date)
      expect(itinerary.updatedAt).toBeInstanceOf(Date)
    })
  })

  describe('Data Relationships', () => {
    it('should have consistent data between locations and itineraries', async () => {
      const allLocations = await db.select().from(locations)
      const allItineraries = await db.select().from(itineraries)

      // Check if itinerary locations reference existing location names
      allItineraries.forEach((itinerary) => {
        const tripData = itinerary.tripData as any
        tripData.locations.forEach((tripLocation: any) => {
          const matchingLocation = allLocations.find((loc) => loc.name === tripLocation.name)
          expect(matchingLocation).toBeDefined()
        })
      })
    })
  })
})
