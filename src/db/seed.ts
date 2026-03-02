import { db } from './index'
import { itineraries, locations } from './schema'

const seedData = {
  locations: [
    {
      name: 'Núi Cấm',
      description: 'Ngọn núi cao nhất An Giang với cảnh quan hùng vĩ và không khí trong lành',
      latitude: 10.3519,
      longitude: 105.0867,
      imageUrl: 'https://example.com/nuicam.jpg',
      category: 'nature'
    },
    {
      name: 'Tây Ninh',
      description: 'Thánh địa Cao Đài với kiến trúc độc đáo và màu sắc rực rỡ',
      latitude: 11.3224,
      longitude: 106.0944,
      imageUrl: 'https://example.com/tayninh.jpg',
      category: 'religious'
    },
    {
      name: 'Chợ Châu Đốc',
      description: 'Thiên đường ẩm thực với nhiều đặc sản vùng miền',
      latitude: 10.6979,
      longitude: 105.1167,
      imageUrl: 'https://example.com/chaodoc.jpg',
      category: 'food'
    },
    {
      name: 'Hồ Thoại Ngọc Hầu',
      description: 'Hồ nước ngọt lớn nhất An Giang với cảnh quan đẹp và nhiều hoạt động vui chơi',
      latitude: 10.3894,
      longitude: 105.2367,
      imageUrl: 'https://example.com/hothoaingochau.jpg',
      category: 'nature'
    },
    {
      name: 'Làng nghề làm bánh tráng',
      description: 'Xem quy trình làm bánh tráng truyền thống và mua đặc sản',
      latitude: 10.7123,
      longitude: 105.0987,
      imageUrl: 'https://example.com/langngherong.jpg',
      category: 'culture'
    }
  ],
  itineraries: [
    {
      userId: 'user123',
      title: 'Tour 2 ngày khám phá An Giang',
      tripData: {
        duration: '2 days',
        locations: [
          {
            id: 1,
            name: 'Núi Cấm',
            duration: '4 hours',
            activities: ['Leo núi', 'Chụp ảnh', 'Thưởng thức cảnh quan']
          },
          {
            id: 2,
            name: 'Chợ Châu Đốc',
            duration: '2 hours',
            activities: ['Ăn đặc sản', 'Mua quà lưu niệm']
          }
        ],
        budget: 1500000,
        transportation: 'xe máy'
      }
    },
    {
      userId: 'user456',
      title: 'Tour văn hóa tâm linh',
      tripData: {
        duration: '1 day',
        locations: [
          {
            id: 2,
            name: 'Tây Ninh',
            duration: '3 hours',
            activities: ['Tham quan', 'Chiêm bái', 'Tìm hiểu văn hóa']
          },
          {
            id: 5,
            name: 'Làng nghề làm bánh tráng',
            duration: '2 hours',
            activities: ['Xem quy trình sản xuất', 'Mua bánh']
          }
        ],
        budget: 800000,
        transportation: 'ô tô'
      }
    }
  ]
}

async function seedDatabase() {
  try {
    console.info('🌱 Starting database seeding...')

    // Clear existing data
    await db.delete(itineraries)
    await db.delete(locations)
    console.info('🧹 Cleared existing data')

    // Insert locations
    const insertedLocations = await db.insert(locations).values(seedData.locations).returning()
    console.info(`✅ Inserted ${insertedLocations.length} locations`)

    // Insert itineraries
    const insertedItineraries = await db.insert(itineraries).values(seedData.itineraries).returning()
    console.info(`✅ Inserted ${insertedItineraries.length} itineraries`)

    console.info('🎉 Database seeding completed successfully!')

    return {
      locations: insertedLocations,
      itineraries: insertedItineraries
    }
  } catch (error) {
    console.error('❌ Database seeding failed:', error)
    throw error
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}

export { seedData, seedDatabase }
