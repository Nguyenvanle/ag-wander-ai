import { useQuery } from '@tanstack/react-query'

import type { SelectLocation } from '@/db/schema'
import { supabase } from '@/lib/supabase-client'

export function useLocations() {
  return useQuery({
    queryKey: ['locations'],
    queryFn: async (): Promise<SelectLocation[]> => {
      const { data, error } = await supabase.from('locations').select('*').order('name')

      if (error) {
        console.error('Supabase error:', error)
        throw new Error(`Error fetching locations: ${error.message}`)
      }

      return data || []
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 3
  })
}

export function useLocationsByCategory(category?: string) {
  return useQuery({
    queryKey: ['locations', 'category', category],
    queryFn: async (): Promise<SelectLocation[]> => {
      let query = supabase.from('locations').select('*').order('name')

      if (category && category !== 'all') {
        query = query.eq('category', category)
      }

      const { data, error } = await query

      if (error) {
        throw new Error(`Error fetching locations by category: ${error.message}`)
      }

      return data || []
    },
    staleTime: 1000 * 60 * 10,
    retry: 3,
    enabled: true
  })
}

export function useSearchLocations(searchTerm?: string) {
  return useQuery({
    queryKey: ['locations', 'search', searchTerm],
    queryFn: async (): Promise<SelectLocation[]> => {
      let query = supabase.from('locations').select('*').order('name')

      if (searchTerm && searchTerm.trim()) {
        query = query.ilike('name', `%${searchTerm.trim()}%`)
      }

      const { data, error } = await query

      if (error) {
        throw new Error(`Error searching locations: ${error.message}`)
      }

      return data || []
    },
    staleTime: 1000 * 60 * 5, // 5 minutes for search results
    retry: 2,
    enabled: !!searchTerm && searchTerm.trim().length > 0
  })
}
