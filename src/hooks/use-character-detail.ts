"use client"

import { useState, useEffect } from "react"
import type { Character, Comic, Event } from "@/types/character"

export function useCharacterDetail(characterId: string) {
  const [character, setCharacter] = useState<Character | null>(null)
  const [comics, setComics] = useState<Comic[]>([])
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCharacterData = async () => {
      if (!characterId) return

      try {
        console.log("Fetching character with ID:", characterId)

        // Fetch character details
        const characterResponse = await fetch(`/api/character/${characterId}`)
        console.log("Character response status:", characterResponse.status)

        if (!characterResponse.ok) {
          throw new Error(`HTTP error! status: ${characterResponse.status}`)
        }

        const characterText = await characterResponse.text()
        if (!characterText) {
          throw new Error("Empty response for character data")
        }

        let characterData
        try {
          characterData = JSON.parse(characterText)
        } catch (parseError) {
          console.error("Failed to parse character JSON:", characterText)
          throw new Error("Invalid JSON response for character")
        }

        if (characterData.error) {
          throw new Error(characterData.error)
        }

        if (!characterData.results || !characterData.results[0]) {
          throw new Error("Character not found")
        }

        console.log("Character data received:", characterData.results[0])
        setCharacter(characterData.results[0])

        // Fetch character comics
        try {
          const comicsResponse = await fetch(`/api/character/${characterId}/comics`)
          console.log("Comics response status:", comicsResponse.status)

          if (comicsResponse.ok) {
            const comicsText = await comicsResponse.text()
            console.log("Comics response text length:", comicsText.length)

            if (comicsText) {
              try {
                const comicsData = JSON.parse(comicsText)
                console.log("Comics data structure:", {
                  hasError: !!comicsData.error,
                  hasResults: !!comicsData.results,
                  resultsLength: comicsData.results?.length || 0,
                  total: comicsData.total || 0,
                })

                if (!comicsData.error && comicsData.results) {
                  console.log("Comics loaded successfully:", comicsData.results.length)
                  console.log("First comic:", comicsData.results[0])
                  setComics(comicsData.results)
                } else {
                  console.warn("Comics data error or empty results:", comicsData.error)
                  setComics([])
                }
              } catch (parseError) {
                console.error("Failed to parse comics JSON:", parseError)
                console.log("Raw comics response:", comicsText)
                setComics([])
              }
            } else {
              console.warn("Empty comics response")
              setComics([])
            }
          } else {
            const errorText = await comicsResponse.text()
            console.error("Comics API error:", comicsResponse.status, errorText)
            setComics([])
          }
        } catch (comicsError) {
          console.error("Failed to fetch comics:", comicsError)
          setComics([])
        }

        // Fetch character events (for movies)
        try {
          const eventsResponse = await fetch(`/api/character/${characterId}/events`)
          console.log("Events response status:", eventsResponse.status)

          if (eventsResponse.ok) {
            const eventsText = await eventsResponse.text()
            if (eventsText) {
              const eventsData = JSON.parse(eventsText)
              if (!eventsData.error && eventsData.results) {
                console.log("=== EVENTS DEBUG ===")
                console.log("Events loaded:", eventsData.results.length)
                console.log("First event:", eventsData.results[0])
                console.log("Events structure:", eventsData.results.slice(0, 2))
                console.log("=== END EVENTS DEBUG ===")
                setEvents(eventsData.results)
              }
            }
          }
        } catch (eventsError) {
          console.warn("Failed to fetch events:", eventsError)
          setEvents([])
        }
      } catch (error) {
        console.error("Error fetching character data:", error)
        setCharacter(null)
        setComics([])
        setEvents([])
      } finally {
        setLoading(false)
      }
    }

    fetchCharacterData()
  }, [characterId])

  const getLatestComic = () => {
    if (comics.length === 0) return null
    return comics[0] // Comics are already sorted by date in the API call
  }

  const displayedComics = comics.slice(0, 10)

  return {
    character,
    comics,
    events,
    loading,
    setComics,
    getLatestComic,
    displayedComics,
  }
}
