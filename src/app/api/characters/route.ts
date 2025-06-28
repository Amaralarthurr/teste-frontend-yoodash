import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const MARVEL_BASE_URL = "https://gateway.marvel.com/v1/public"

function getMarvelAuth() {
  const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
  const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY

  if (!publicKey || !privateKey) {
    throw new Error("Marvel API keys not configured")
  }

  const timestamp = Date.now().toString()
  const hash = crypto
    .createHash("md5")
    .update(timestamp + privateKey + publicKey)
    .digest("hex")

  return {
    ts: timestamp,
    apikey: publicKey,
    hash: hash,
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") || "20"
    const offset = searchParams.get("offset") || "0"
    const nameStartsWith = searchParams.get("nameStartsWith")

    console.log("=== CHARACTERS API DEBUG ===")
    console.log("Query params:", { limit, offset, nameStartsWith })

    const auth = getMarvelAuth()
    console.log("Auth generated successfully")

    let charactersUrl = `${MARVEL_BASE_URL}/characters?ts=${auth.ts}&apikey=${auth.apikey}&hash=${auth.hash}&limit=${limit}&offset=${offset}&orderBy=name`

    if (nameStartsWith) {
      charactersUrl += `&nameStartsWith=${encodeURIComponent(nameStartsWith)}`
    }

    console.log("Characters URL:", charactersUrl.replace(auth.apikey, "PUBLIC_KEY").replace(auth.hash, "HASH"))

    const response = await fetch(charactersUrl)
    console.log("Characters API Response Status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Characters API Error Response:", errorText)
      return NextResponse.json(
        { error: `Marvel API error: ${response.status} - ${errorText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Characters API Response Data Structure:", {
      code: data.code,
      status: data.status,
      resultsCount: data.data?.results?.length || 0,
      total: data.data?.total || 0,
    })

    if (data.code !== 200) {
      console.error("Marvel API returned error code:", data.code, data.status)
      return NextResponse.json({ error: `Marvel API error: ${data.status}` }, { status: 400 })
    }

    console.log("=== END CHARACTERS API DEBUG ===")

    return NextResponse.json({
      results: data.data?.results || [],
      total: data.data?.total || 0,
    })
  } catch (error) {
    console.error("Characters API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch characters",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
