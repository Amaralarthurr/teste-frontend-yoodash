import { type NextRequest, NextResponse } from "next/server"
import { md5 } from "@/lib/md5"

// Usar as chaves que funcionam no seu código JavaScript
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

async function fetchWithRetry(url: string, maxRetries = 3, delay = 1000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} - Fetching:`, url.replace(MARVEL_PUBLIC_KEY, "PUBLIC_KEY"))

      const response = await fetch(url, {
        headers: {
          "User-Agent": "Marvel-App/1.0",
          Accept: "application/json",
        },
      })

      console.log(`Attempt ${attempt} - Status:`, response.status)

      // Se for 418 (teapot) ou 503 (service unavailable), tenta novamente
      if (response.status === 418 || response.status === 503) {
        if (attempt < maxRetries) {
          console.log(`Server unavailable (${response.status}), retrying in ${delay}ms...`)
          await new Promise((resolve) => setTimeout(resolve, delay))
          delay *= 2 // Exponential backoff
          continue
        }
      }

      return response
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error)
      if (attempt < maxRetries) {
        console.log(`Retrying in ${delay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
        delay *= 2
      } else {
        throw error
      }
    }
  }
}

// Dados mock expandidos para quando a API estiver indisponível
const mockCharacters = [
  {
    id: 1011334,
    name: "3-D Man",
    description: "Mock character - Marvel API temporarily unavailable",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
      extension: "jpg",
    },
    comics: { available: 12 },
    series: { available: 3 },
    stories: { available: 21 },
    events: { available: 1 },
  },
  {
    id: 1017100,
    name: "A-Bomb (HAS)",
    description: "Rick Jones has been Hulk's best bud for decades, but now he's more than a friend...he's a teammate!",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
      extension: "jpg",
    },
    comics: { available: 4 },
    series: { available: 2 },
    stories: { available: 7 },
    events: { available: 0 },
  },
  {
    id: 1009144,
    name: "A.I.M.",
    description: "AIM is a terrorist organization bent on destroying the world.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec",
      extension: "jpg",
    },
    comics: { available: 53 },
    series: { available: 37 },
    stories: { available: 57 },
    events: { available: 1 },
  },
  {
    id: 1010699,
    name: "Aaron Stack",
    description: "Machine Man, also known as Aaron Stack, is an android.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/6/60/50febf4ae101d",
      extension: "jpg",
    },
    comics: { available: 14 },
    series: { available: 6 },
    stories: { available: 15 },
    events: { available: 0 },
  },
  {
    id: 1009146,
    name: "Abomination (Emil Blonsky)",
    description: "Formerly known as Emil Blonsky, a spy of Soviet Yugoslavian origin working for the KGB.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/9/50/4ce18691cbf04",
      extension: "jpg",
    },
    comics: { available: 40 },
    series: { available: 17 },
    stories: { available: 38 },
    events: { available: 2 },
  },
  {
    id: 1016823,
    name: "Abomination (Ultimate)",
    description: "Ultimate version of the Abomination.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    comics: { available: 2 },
    series: { available: 1 },
    stories: { available: 2 },
    events: { available: 0 },
  },
  {
    id: 1009148,
    name: "Absorbing Man",
    description: "Carl 'Crusher' Creel has the power to absorb the properties of any material he touches.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/1/b0/5269678709fb7",
      extension: "jpg",
    },
    comics: { available: 95 },
    series: { available: 54 },
    stories: { available: 114 },
    events: { available: 4 },
  },
  {
    id: 1009149,
    name: "Abyss",
    description: "Abyss is a mutant with the ability to control and manipulate space.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/9/30/535feab462a64",
      extension: "jpg",
    },
    comics: { available: 8 },
    series: { available: 3 },
    stories: { available: 8 },
    events: { available: 1 },
  },
  {
    id: 1010903,
    name: "Abyss (Age of Apocalypse)",
    description: "Age of Apocalypse version of Abyss.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/3/80/4c00358ec7548",
      extension: "jpg",
    },
    comics: { available: 3 },
    series: { available: 1 },
    stories: { available: 3 },
    events: { available: 0 },
  },
  {
    id: 1011266,
    name: "Adam Destine",
    description: "Member of the Destine family with superhuman abilities.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    comics: { available: 8 },
    series: { available: 2 },
    stories: { available: 8 },
    events: { available: 0 },
  },
  {
    id: 1010354,
    name: "Adam Warlock",
    description: "Adam Warlock is an artificially created human who was born in a cocoon at a scientific complex.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/a/f0/5202887448860",
      extension: "jpg",
    },
    comics: { available: 181 },
    series: { available: 83 },
    stories: { available: 294 },
    events: { available: 7 },
  },
  {
    id: 1010846,
    name: "Aegis (Trey Rollins)",
    description: "Trey Rollins was given the power of Aegis by the dying Praetor.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/4c0035c9c425d",
      extension: "jpg",
    },
    comics: { available: 6 },
    series: { available: 1 },
    stories: { available: 7 },
    events: { available: 0 },
  },
  {
    id: 1017851,
    name: "Aero (Aero)",
    description: "Aero has the ability to control air and wind currents.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    comics: { available: 12 },
    series: { available: 1 },
    stories: { available: 12 },
    events: { available: 0 },
  },
  {
    id: 1012386,
    name: "Agatha Harkness",
    description:
      "Agatha Harkness is a powerful sorceress, typically portrayed as a friend and teacher of Wanda Maximoff.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/c/a0/4ce5a9bf70e19",
      extension: "jpg",
    },
    comics: { available: 42 },
    series: { available: 26 },
    stories: { available: 45 },
    events: { available: 0 },
  },
  {
    id: 1011297,
    name: "Agent Brand",
    description: "Agent Abigail Brand is the commander of the orbital space station known as the Peak.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/4/60/52695285d6e7e",
      extension: "jpg",
    },
    comics: { available: 37 },
    series: { available: 21 },
    stories: { available: 39 },
    events: { available: 0 },
  },
  {
    id: 1011031,
    name: "Agent X (Nijo)",
    description:
      "Originally a partner of the mind-altering assassin Black Swan, Nijo spied on Deadpool as part of the Swan's plan.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    comics: { available: 18 },
    series: { available: 1 },
    stories: { available: 21 },
    events: { available: 0 },
  },
  {
    id: 1009150,
    name: "Agent Zero",
    description: "Christoph Nord (Maverick) was a mutant and former member of the Weapon X program.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c0042121d790",
      extension: "jpg",
    },
    comics: { available: 17 },
    series: { available: 10 },
    stories: { available: 21 },
    events: { available: 0 },
  },
  {
    id: 1011198,
    name: "Agents of Atlas",
    description: "The Agents of Atlas are a fictional superhero team appearing in American comic books.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/9/a0/4ce18a834b7f5",
      extension: "jpg",
    },
    comics: { available: 46 },
    series: { available: 3 },
    stories: { available: 47 },
    events: { available: 0 },
  },
  {
    id: 1011175,
    name: "Aginar",
    description: "Aginar is a member of the Asgardian race and a warrior.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    comics: { available: 4 },
    series: { available: 1 },
    stories: { available: 4 },
    events: { available: 0 },
  },
  {
    id: 1012717,
    name: "Air-Walker (Gabriel Lan)",
    description:
      "Gabriel Lan was a former Nova Corps Centurion who was transformed by Galactus into the herald Air-Walker.",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    comics: { available: 6 },
    series: { available: 5 },
    stories: { available: 6 },
    events: { available: 0 },
  },
]

export async function GET(request: NextRequest) {
  try {
    console.log("=== CHARACTERS API DEBUG ===")
    console.log("Public Key:", MARVEL_PUBLIC_KEY ? "LOADED" : "NOT_LOADED")
    console.log("Private Key:", MARVEL_PRIVATE_KEY ? "LOADED" : "NOT_LOADED")

    const { searchParams } = new URL(request.url)
    const nameStartsWith = searchParams.get("nameStartsWith")
    const offset = searchParams.get("offset") || "0"
    const limit = searchParams.get("limit") || "20"

    console.log("Query params:", { nameStartsWith, offset, limit })

    const authParams = generateAuthParams()

    console.log("Auth params generated:", {
      timestamp: authParams.ts,
      publicKey: authParams.apikey.substring(0, 8) + "...",
      hash: authParams.hash.substring(0, 8) + "...",
    })

    const params = new URLSearchParams({
      ts: authParams.ts,
      apikey: authParams.apikey,
      hash: authParams.hash,
      limit: limit.toString(),
      offset: offset.toString(),
      orderBy: "name",
    })

    if (nameStartsWith) {
      params.append("nameStartsWith", nameStartsWith)
    }

    const url = `${MARVEL_BASE_URL}/characters?${params}`

    const response = await fetchWithRetry(url)

    if (!response) {
      throw new Error("Failed to get response after retries")
    }

    const responseText = await response.text()
    console.log("Final response status:", response.status)
    console.log("Response text preview:", responseText.substring(0, 200))

    if (!response.ok) {
      console.error("Marvel API Error Response:", responseText)

      // Se for erro 418 (teapot), retornar dados mock para não quebrar a aplicação
      if (response.status === 418) {
        console.log("Returning mock data due to teapot error")

        // Filtrar dados mock se houver busca
        let filteredMockData = mockCharacters
        if (nameStartsWith) {
          filteredMockData = mockCharacters.filter((char) =>
            char.name.toLowerCase().startsWith(nameStartsWith.toLowerCase()),
          )
        }

        // Aplicar paginação aos dados mock
        const offsetNum = Number.parseInt(offset)
        const limitNum = Number.parseInt(limit)
        const paginatedData = filteredMockData.slice(offsetNum, offsetNum + limitNum)

        return NextResponse.json({
          offset: offsetNum,
          limit: limitNum,
          total: filteredMockData.length,
          count: paginatedData.length,
          results: paginatedData,
        })
      }

      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch {
        errorData = { raw: responseText }
      }

      return NextResponse.json(
        {
          error: `Marvel API error: ${response.status} - ${responseText}`,
          debug: {
            status: response.status,
            contentType: response.headers.get("content-type"),
            responsePreview: responseText.substring(0, 500),
            authParams: {
              timestamp: authParams.ts,
              publicKey: authParams.apikey.substring(0, 8) + "...",
              hash: authParams.hash.substring(0, 8) + "...",
            },
          },
        },
        { status: response.status },
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (parseError) {
      console.error("Failed to parse response as JSON:", parseError)
      return NextResponse.json(
        {
          error: "Invalid JSON response from Marvel API",
          debug: {
            parseError: parseError instanceof Error ? parseError.message : String(parseError),
            responsePreview: responseText.substring(0, 500),
          },
        },
        { status: 500 },
      )
    }

    console.log("Success! Characters found:", data.data?.results?.length || 0)
    console.log("=== END CHARACTERS API DEBUG ===")

    return NextResponse.json(data.data)
  } catch (error) {
    console.error("API Route Error:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
        details: String(error),
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
