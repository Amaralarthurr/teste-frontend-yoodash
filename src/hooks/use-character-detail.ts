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
      if (!characterId) {
        setLoading(false)
        return
      }

      try {
        console.log("=== FETCHING CHARACTER DATA ===")
        console.log("Character ID:", characterId)

        setLoading(true)

        // Fetch character details
        console.log("1. Fetching character details...")
        const characterResponse = await fetch(`/api/character/${characterId}`)

        if (!characterResponse.ok) {
          throw new Error(`Character API error: ${characterResponse.status}`)
        }

        const characterData = await characterResponse.json()

        if (characterData.error) {
          throw new Error(characterData.error)
        }

        if (!characterData.results || !characterData.results[0]) {
          throw new Error("Character not found")
        }

        console.log("✓ Character loaded:", characterData.results[0].name)
        setCharacter(characterData.results[0])

        // Fetch comics
        console.log("2. Fetching character comics...")
        try {
          const comicsResponse = await fetch(`/api/character/${characterId}/comics`)

          if (comicsResponse.ok) {
            const comicsData = await comicsResponse.json()

            if (comicsData.error) {
              console.error("Comics API returned error:", comicsData.error)
              setComics([])
            } else if (comicsData.results && Array.isArray(comicsData.results)) {
              console.log("✓ Comics loaded from Marvel API:", comicsData.results.length)
              setComics(comicsData.results)
            } else {
              console.warn("No comics results found")
              setComics([])
            }
          } else {
            const errorData = await comicsResponse.json()
            console.error("Comics API error:", errorData)
            setComics([])
          }
        } catch (comicsError) {
          console.error("Failed to fetch comics:", comicsError)
          setComics([])
        }

        // Fetch events
        console.log("3. Fetching character events...")
        try {
          const eventsResponse = await fetch(`/api/character/${characterId}/events`)

          if (eventsResponse.ok) {
            const eventsData = await eventsResponse.json()

            if (eventsData.results && Array.isArray(eventsData.results)) {
              console.log("✓ Events loaded:", eventsData.results.length)
              setEvents(eventsData.results)
            } else {
              setEvents([])
            }
          } else {
            console.warn("Events API failed, continuing without events")
            setEvents([])
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
