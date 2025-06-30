"use client"

import { useState, useEffect, useCallback } from "react"
import type { Character } from "@/types/marvel"

interface UseCharactersReturn {
  characters: Character[]
  loading: boolean
  searchTerm: string
  setSearchTerm: (term: string) => void
  offset: number
  setOffset: (offset: number) => void
  totalCharacters: number
  error: string | null
  fetchCharacters: (search?: string, newOffset?: number) => void
}

export function useCharacters(limit = 20): UseCharactersReturn {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [offset, setOffset] = useState(0)
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const fetchCharacters = useCallback(
    async (search?: string, newOffset?: number) => {
      try {
        setLoading(true)
        setError(null)

        const currentOffset = newOffset ?? offset
        const currentSearch = search ?? searchTerm

        const params = new URLSearchParams({
          limit: limit.toString(),
          offset: currentOffset.toString(),
        })

        if (currentSearch && currentSearch.trim()) {
          params.append("nameStartsWith", currentSearch.trim())
        }


        const response = await fetch(`/api/characters?${params}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()


        setCharacters(data.results || [])
        setTotalCharacters(data.total || 0)

        if (newOffset !== undefined) {
          setOffset(newOffset)
        }

        if (search !== undefined) {
          setSearchTerm(search)
        }
      } catch (err) {
        console.error("Error fetching characters:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch characters")
        setTotalCharacters(100)
        setCharacters([])
      } finally {
        setLoading(false)
      }
    },
    [limit, offset, searchTerm],
  )

  useEffect(() => {
    fetchCharacters()
  }, [])

  return {
    characters,
    loading,
    searchTerm,
    setSearchTerm,
    offset,
    setOffset,
    totalCharacters,
    error,
    fetchCharacters,
  }
}
