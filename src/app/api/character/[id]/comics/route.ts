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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("=== COMICS API DEBUG ===")
    console.log("Character ID:", params.id)

    if (!params.id) {
      console.error("Character ID not provided")
      return NextResponse.json({ error: "Character ID is required" }, { status: 400 })
    }

    const auth = getMarvelAuth()
    console.log("Auth generated successfully")

    // Buscar quadrinhos do personagem
    const comicsUrl = `${MARVEL_BASE_URL}/characters/${params.id}/comics?ts=${auth.ts}&apikey=${auth.apikey}&hash=${auth.hash}&limit=20&orderBy=-onsaleDate&format=comic`
    console.log("Comics URL:", comicsUrl.replace(auth.apikey, "PUBLIC_KEY").replace(auth.hash, "HASH"))

    const response = await fetch(comicsUrl)
    console.log("Comics API Response Status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Comics API Error Response:", errorText)
      return NextResponse.json(
        { error: `Marvel API error: ${response.status} - ${errorText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("Comics API Response Data Structure:", {
      code: data.code,
      status: data.status,
      resultsCount: data.data?.results?.length || 0,
      total: data.data?.total || 0,
    })

    if (data.code !== 200) {
      console.error("Marvel API returned error code:", data.code, data.status)
      return NextResponse.json({ error: `Marvel API error: ${data.status}` }, { status: 400 })
    }

    // Log dos primeiros quadrinhos para debug
    if (data.data?.results?.length > 0) {
      console.log("First comic sample:", {
        id: data.data.results[0].id,
        title: data.data.results[0].title,
        thumbnail: data.data.results[0].thumbnail,
        dates: data.data.results[0].dates,
      })
    }

    console.log("=== END COMICS API DEBUG ===")

    return NextResponse.json({
      results: data.data?.results || [],
      total: data.data?.total || 0,
    })
  } catch (error) {
    console.error("Comics API Error:", error)
    return NextResponse.json(
      {
        error: "Failed to fetch character comics",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
