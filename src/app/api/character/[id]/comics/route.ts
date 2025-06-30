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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const characterId = params.id

    const authParams = generateAuthParams()

    const urlParams = new URLSearchParams({
      ts: authParams.ts,
      apikey: authParams.apikey,
      hash: authParams.hash,
      limit: "10",
      orderBy: "-onsaleDate",
    })

    const url = `${MARVEL_BASE_URL}/characters/${characterId}/comics?${urlParams}`

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Marvel-App/1.0",
        Accept: "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Marvel API Error:", response.status, errorText)
      return NextResponse.json(
        { error: `Marvel API error: ${response.status}`, details: errorText },
        { status: response.status },
      )
    }

    const data = await response.json()


    if (data.code !== 200) {
      console.error("Marvel API returned error:", data.code, data.status)
      return NextResponse.json({ error: `Marvel API error: ${data.status}` }, { status: 400 })
    }

    if (data.data?.results?.length > 0) {
      const firstComic = data.data.results[0]
    }


    return NextResponse.json(data.data)
  } catch (error) {
    console.error("Comics API Route Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch comics from Marvel API",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
