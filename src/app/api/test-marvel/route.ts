import { NextResponse } from "next/server"
import crypto from "crypto"

export async function GET() {
  try {
    console.log("=== MARVEL API TEST ===")
    console.log("NEXT_PUBLIC_MARVEL_PUBLIC_KEY exists:", !!process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY)
    console.log("NEXT_PUBLIC_MARVEL_PRIVATE_KEY exists:", !!process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY)

    const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
    const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY

    if (!publicKey || !privateKey) {
      console.error("Marvel API keys not found in environment variables")
      console.log(
        "Available Marvel env vars:",
        Object.keys(process.env).filter((key) => key.includes("MARVEL")),
      )
      return NextResponse.json({
        success: false,
        error: "Marvel API keys not found in environment variables",
        availableMarvelVars: Object.keys(process.env).filter((key) => key.includes("MARVEL")),
      })
    }

    console.log("Public Key found, length:", publicKey.length)
    console.log("Private Key found, length:", privateKey.length)
    console.log("Public Key first 10 chars:", publicKey.substring(0, 10))

    // Generate Marvel API authentication
    const timestamp = Date.now().toString()
    const hash = crypto
      .createHash("md5")
      .update(timestamp + privateKey + publicKey)
      .digest("hex")

    // Test a simple Marvel API call
    const testUrl = `https://gateway.marvel.com/v1/public/characters?ts=${timestamp}&apikey=${publicKey}&hash=${hash}&limit=1`
    console.log("Testing Marvel API with URL:", testUrl.replace(publicKey, "PUBLIC_KEY").replace(hash, "HASH"))

    const response = await fetch(testUrl)
    console.log("Marvel API response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Marvel API error:", errorText)
      return NextResponse.json({
        success: false,
        error: `Marvel API returned ${response.status}: ${errorText}`,
        publicKeyLength: publicKey.length,
        privateKeyLength: privateKey.length,
      })
    }

    const data = await response.json()
    console.log("Marvel API test successful, code:", data.code)
    console.log("=== END MARVEL API TEST ===")

    return NextResponse.json({
      success: true,
      message: "Marvel API connection successful",
      publicKeyLength: publicKey.length,
      privateKeyLength: privateKey.length,
      responseCode: data.code,
      totalCharacters: data.data?.total || 0,
    })
  } catch (error) {
    console.error("Marvel API test error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : String(error),
    })
  }
}
