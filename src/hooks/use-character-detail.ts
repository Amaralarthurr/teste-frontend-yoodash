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

        setLoading(true)

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

        setCharacter(characterData.results[0])

        try {
          const comicsResponse = await fetch(`/api/character/${characterId}/comics`)

          if (comicsResponse.ok) {
            const comicsData = await comicsResponse.json()

            if (comicsData.error) {
              console.error("Comics API returned error:", comicsData.error)
              setComics([])
            } else if (comicsData.results && Array.isArray(comicsData.results)) {
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

        try {
          const eventsResponse = await fetch(`/api/character/${characterId}/events`)

          if (eventsResponse.ok) {
            const eventsData = await eventsResponse.json()

            if (eventsData.results && Array.isArray(eventsData.results)) {
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
