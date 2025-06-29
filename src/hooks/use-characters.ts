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

        console.log("=== FETCHING CHARACTERS ===")
        console.log("Params:", {
          limit,
          offset: currentOffset,
          search: currentSearch,
        })

        const response = await fetch(`/api/characters?${params}`)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        console.log("=== CHARACTERS API RESPONSE ===")
        console.log("Response data:", {
          resultsCount: data.results?.length || 0,
          total: data.total || 0,
          offset: data.offset || 0,
          limit: data.limit || 0,
        })

        setCharacters(data.results || [])
        setTotalCharacters(data.total || 0)

        // Update offset if a new value was passed
        if (newOffset !== undefined) {
          setOffset(newOffset)
        }

        // Update searchTerm if a new value was passed
        if (search !== undefined) {
          setSearchTerm(search)
        }

        console.log("=== STATE UPDATED ===")
        console.log("Characters set:", data.results?.length || 0)
        console.log("Total characters set:", data.total || 0)
        console.log("Offset set:", newOffset !== undefined ? newOffset : offset)
      } catch (err) {
        console.error("Error fetching characters:", err)
        setError(err instanceof Error ? err.message : "Failed to fetch characters")
        // Set some default values to test pagination
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
