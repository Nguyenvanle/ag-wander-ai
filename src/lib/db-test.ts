import { db } from '../db'
import { locations } from '../db/schema'

export async function testDatabaseConnection() {
  try {
    // Test basic connection with a simple query
    const result = await db.select().from(locations).limit(1)
    console.info('✅ Database connection successful!')
    return { success: true, data: result }
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    return { success: false, error }
  }
}
