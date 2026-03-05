import { createFileRoute } from '@tanstack/react-router'

import { Compass, MapPin, Star } from 'lucide-react'

import { LocationsList } from '@/components/common'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='min-h-screen bg-linear-to-b from-blue-50 to-white'>
      {/* Hero Section */}
      <section className='relative py-20 px-6 text-center overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-r from-blue-500/5 via-green-500/5 to-yellow-500/5'></div>
        <div className='relative max-w-5xl mx-auto'>
          <div className='flex items-center justify-center gap-4 mb-6'>
            <Compass className='w-16 h-16 text-blue-600' />
            <h1 className='text-5xl md:text-6xl font-bold text-gray-900 tracking-tight'>
              <span className='text-blue-600'>AnGiang</span> <span className='text-green-600'>Wander</span>{' '}
              <span className='text-yellow-600'>AI</span>
            </h1>
          </div>
          <p className='text-xl md:text-2xl text-gray-600 mb-4 font-light'>
            Khám phá vẻ đẹp An Giang với trí tuệ nhân tạo
          </p>
          <p className='text-lg text-gray-500 max-w-3xl mx-auto mb-8'>
            Trải nghiệm du lịch thông minh với lịch trình được cá nhân hóa, bản đồ tương tác và những điểm đến độc đáo
            nhất vùng đất phương Nam.
          </p>
          <div className='flex flex-col items-center gap-4'>
            <Button className='px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg'>
              Bắt đầu khám phá
            </Button>
            <div className='flex items-center gap-6 text-sm text-gray-500 mt-4'>
              <div className='flex items-center gap-2'>
                <MapPin className='w-4 h-4' />
                <span>15+ Địa điểm nổi tiếng</span>
              </div>
              <div className='flex items-center gap-2'>
                <Star className='w-4 h-4' />
                <span>Lịch trình thông minh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-16 px-6 max-w-7xl mx-auto'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Tính năng nổi bật</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
              <MapPin className='w-6 h-6 text-blue-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Bản đồ tương tác</h3>
            <p className='text-gray-600'>
              Khám phá các địa điểm trên bản đồ với thông tin chi tiết và hình ảnh thực tế.
            </p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
              <Compass className='w-6 h-6 text-green-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>AI Trip Planner</h3>
            <p className='text-gray-600'>
              Lịch trình du lịch được cá nhân hóa bởi AI dựa trên sở thích và thời gian của bạn.
            </p>
          </div>

          <div className='bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow'>
            <div className='w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4'>
              <Star className='w-6 h-6 text-yellow-600' />
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Điểm đến độc đáo</h3>
            <p className='text-gray-600'>
              Khám phá những địa điểm văn hóa, lịch sử và thiên nhiên đặc trưng của An Giang.
            </p>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className='py-16 px-6 max-w-7xl mx-auto bg-gray-50 rounded-2xl'>
        <h2 className='text-3xl font-bold text-gray-900 mb-8 text-center'>Điểm đến nổi bật</h2>
        <LocationsList />
      </section>
    </div>
  )
}
