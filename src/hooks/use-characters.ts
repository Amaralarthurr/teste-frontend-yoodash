"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export function useCharacters(limit = 20) {
  const searchParams = useSearchParams()
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [offset, setOffset] = useState(0)
  const [totalCharacters, setTotalCharacters] = useState(0)
  const [error, setError] = useState<string | null>(null)

  // Load search term from URL parameters
  useEffect(() => {
    const urlSearchTerm = searchParams.get("nameStartsWith")
    if (urlSearchTerm) {
      console.log("=== URL SEARCH DETECTED ===")
      console.log("Search term from URL:", urlSearchTerm)
      setSearchTerm(urlSearchTerm)
      setOffset(0)
    }
  }, [searchParams])

  const fetchCharacters = async (searchName = "", currentOffset = 0) => {
    setLoading(true)
    setError(null)
    try {
      let url = `/api/characters?limit=${limit}&offset=${currentOffset}`
      if (searchName) {
        url += `&nameStartsWith=${encodeURIComponent(searchName)}`
      }

      console.log("Fetching from:", url)
      const response = await fetch(url)
      console.log("Response status:", response.status)

      if (!response.ok) {
        const errorText = await response.text()
        console.error("HTTP Error Response:", errorText)
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`)
      }

      const text = await response.text()
      if (!text) {
        throw new Error("Empty response from server")
      }

      let data
      try {
        data = JSON.parse(text)
      } catch (parseError) {
        console.error("Failed to parse JSON:", text)
        throw new Error("Invalid JSON response from server")
      }

      if (data.error) {
        throw new Error(data.error)
      }

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error("Invalid data structure received")
      }

      setCharacters(data.results)
      setTotalCharacters(data.total || 0)
      console.log("Successfully loaded", data.results.length, "characters")
    } catch (error) {
      console.error("Error fetching characters:", error)
      setCharacters([])
      setTotalCharacters(0)
      const errorMessage = error instanceof Error ? error.message : String(error)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const testMarvelAPI = async () => {
    try {
      const response = await fetch("/api/test-marvel")
      const result = await response.json()
      console.log("Marvel API Test Result:", result)
      if (!result.success) {
        setError(`API Test Failed: ${result.error}`)
      }
    } catch (error) {
      console.error("Failed to test Marvel API:", error)
    }
  }

  useEffect(() => {
    testMarvelAPI()
    fetchCharacters(searchTerm, offset)
  }, [searchTerm, offset])

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
