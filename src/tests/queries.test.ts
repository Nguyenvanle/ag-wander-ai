import { eq, like, or } from 'drizzle-orm'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { db } from '../db'
import { itineraries, locations } from '../db/schema'
import { seedDatabase } from '../db/seed'

describe('Database Queries', () => {
  beforeAll(async () => {
    await seedDatabase()
  })

  afterAll(async () => {
    await db.delete(itineraries)
    await db.delete(locations)
  })

  describe('Complex Queries', () => {
    it('should find locations by multiple categories', async () => {
      const result = await db
        .select()
        .from(locations)
        .where(or(eq(locations.category, 'nature'), eq(locations.category, 'culture')))

      expect(result).toHaveLength(3)
      expect(result.every((loc) => loc.category === 'nature' || loc.category === 'culture')).toBe(true)
    })

    it('should search locations by name pattern', async () => {
      const result = await db.select().from(locations).where(like(locations.name, '%Chợ%'))

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Chợ Châu Đốc')
    })

    it('should get itineraries with budget constraints', async () => {
      const allItineraries = await db.select().from(itineraries)

      const cheapItineraries = allItineraries.filter((itinerary: any) => (itinerary.tripData as any).budget <= 1000000)

      expect(cheapItineraries).toHaveLength(1)
      expect(cheapItineraries[0].title).toBe('Tour văn hóa tâm linh')
    })

    it('should count locations by category', async () => {
      const allLocations = await db.select().from(locations)

      const categoryCount = allLocations.reduce((acc: any, location) => {
        acc[location.category] = (acc[location.category] || 0) + 1
        return acc
      }, {})

      expect(categoryCount).toEqual({
        nature: 2,
        religious: 1,
        food: 1,
        culture: 1
      })
    })
  })

  describe('Data Validation', () => {
    it('should validate location data integrity', async () => {
      const allLocations = await db.select().from(locations)

      allLocations.forEach((location) => {
        // Check required fields
        expect(location.name).toBeDefined()
        expect(location.name).not.toBe('')

        expect(location.category).toBeDefined()
        expect(location.category).not.toBe('')

        expect(location.latitude).toBeDefined()
        expect(typeof location.latitude).toBe('number')

        expect(location.longitude).toBeDefined()
        expect(typeof location.longitude).toBe('number')

        // Check coordinates are in valid ranges for Vietnam
        expect(location.latitude).toBeGreaterThanOrEqual(8)
        expect(location.latitude).toBeLessThanOrEqual(24)
        expect(location.longitude).toBeGreaterThanOrEqual(102)
        expect(location.longitude).toBeLessThanOrEqual(110)
      })
    })

    it('should validate itinerary data structure', async () => {
      const allItineraries = await db.select().from(itineraries)

      allItineraries.forEach((itinerary) => {
        const tripData = itinerary.tripData as any

        // Check required trip data fields
        expect(tripData.duration).toBeDefined()
        expect(tripData.locations).toBeDefined()
        expect(tripData.budget).toBeDefined()
        expect(tripData.transportation).toBeDefined()

        // Check locations array
        expect(Array.isArray(tripData.locations)).toBe(true)
        expect(tripData.locations.length).toBeGreaterThan(0)

        // Check each location in trip
        tripData.locations.forEach((tripLocation: any) => {
          expect(tripLocation.name).toBeDefined()
          expect(tripLocation.duration).toBeDefined()
          expect(tripLocation.activities).toBeDefined()
          expect(Array.isArray(tripLocation.activities)).toBe(true)
        })
      })
    })
  })

  describe('Performance Tests', () => {
    it('should execute queries within reasonable time', async () => {
      const startTime = Date.now()

      await db.select().from(locations)
      await db.select().from(itineraries)

      const endTime = Date.now()
      const duration = endTime - startTime

      // Should complete within 1 second
      expect(duration).toBeLessThan(1000)
    })

    it('should handle concurrent queries', async () => {
      const promises = [
        db.select().from(locations),
        db.select().from(itineraries),
        db.select().from(locations).where(eq(locations.category, 'nature')),
        db.select().from(itineraries).where(eq(itineraries.userId, 'user123'))
      ]

      const results = await Promise.all(promises)

      expect(results).toHaveLength(4)
      expect(results[0]).toHaveLength(5) // all locations
      expect(results[1]).toHaveLength(2) // all itineraries
      expect(results[2]).toHaveLength(2) // nature locations
      expect(results[3]).toHaveLength(1) // user123 itineraries
    })
  })
})
