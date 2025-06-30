import { type NextRequest, NextResponse } from "next/server"
import { md5 } from "@/lib/md5"

const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY || "22e9bab7b462ebbd01fee470d5c30192"
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY || "7cd3684824a067744989aa33c44a0fefb24a8740"
const MARVEL_BASE_URL = "https://gateway.marvel.com/v1/public"

function generateAuthParams() {
  const timestamp = Date.now().toString()
  const toBeHashed = timestamp + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY
  const hash = md5(toBeHashed)

  return {
    ts: timestamp,
    apikey: MARVEL_PUBLIC_KEY,
    hash: hash,
  }
}

const mockEventsData = {
  1011334: [
    {
      id: 269,
      title: "Secret Invasion",
      description: "The shape-changing Skrulls have been infiltrating Earth for years.",
      start: "2008-06-01T00:00:00-0400",
      end: "2009-01-01T00:00:00-0400",
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/6/70/51ca1749980e7",
        extension: "jpg",
      },
    },
  ],
}

function generateMockEvents(characterId: string, count = 3) {
  const events = []
  const numId = Number.parseInt(characterId)

  for (let i = 0; i < count; i++) {
    const eventId = numId * 10 + i + 100
    events.push({
      id: eventId,
      title: `Mock Event #${eventId} - Character ${characterId}`,
      description: `This is a mock event for character ${characterId}. The Marvel API is temporarily unavailable.`,
      start: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      end: new Date(Date.now() + Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      thumbnail: {
        path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
        extension: "jpg",
      },
    })
  }

  return events
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const characterId = params.id


    if (!characterId) {
      return NextResponse.json({ error: "Character ID is required" }, { status: 400 })
    }

    const authParams = generateAuthParams()
    const urlParams = new URLSearchParams({
      ts: authParams.ts,
      apikey: authParams.apikey,
      hash: authParams.hash,
      limit: "10",
      orderBy: "-startDate",
    })

    const url = `${MARVEL_BASE_URL}/characters/${characterId}/events?${urlParams}`

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Marvel-App/1.0",
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        const mockEvents =
          (mockEventsData as Record<number, any>)[Number(characterId)] || generateMockEvents(characterId)

        return NextResponse.json({
          results: mockEvents,
          total: mockEvents.length,
        })
      }

      const data = await response.json()

      if (data.code !== 200) {
        console.error("Marvel API returned error code:", data.code, data.status)
        const mockEvents =
          (mockEventsData as Record<number, any>)[Number(characterId)] || generateMockEvents(characterId)

        return NextResponse.json({
          results: mockEvents,
          total: mockEvents.length,
        })
      }


      return NextResponse.json({
        results: data.data?.results || [],
        total: data.data?.total || 0,
      })
    } catch (fetchError) {
      const mockEvents = (mockEventsData as Record<number, any>)[Number(characterId)] || generateMockEvents(characterId)

      return NextResponse.json({
        results: mockEvents,
        total: mockEvents.length,
      })
    }
  } catch (error) {
    console.error("Events API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch character events",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
