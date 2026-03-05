import { useLocations } from '@/hooks/use-locations.hook'

export function LocationsList() {
  const { data: locations, isLoading, error } = useLocations()

  if (isLoading) {
    return (
      <div className='flex justify-center p-8'>
        <div className='text-lg'>Loading locations...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className='flex justify-center p-8'>
        <div className='text-red-500'>Error: {error.message}</div>
      </div>
    )
  }

  if (!locations || locations.length === 0) {
    return (
      <div className='flex justify-center p-8'>
        <div className='text-gray-500'>No locations found</div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {locations.map((location) => (
        <div key={location.id} className='border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white'>
          <h3 className='font-semibold text-lg mb-2'>{location.name}</h3>
          <p className='text-gray-600 text-sm mb-2 line-clamp-2'>{location.description}</p>
          <div className='flex justify-between items-center text-xs text-gray-500'>
            <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>{location.category}</span>
            <span>
              {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
