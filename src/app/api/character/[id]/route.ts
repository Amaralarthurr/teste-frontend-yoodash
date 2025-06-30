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

// Dados mock para personagens específicos
const mockCharacterDetails = {
  1011334: {
    id: 1011334,
    name: "3-D Man",
    description:
      "Hal Chandler is able to project a three-dimensional image of himself up to 100 feet away from his body that is under his complete mental control.",
    modified: "2014-04-29T14:18:17-0400",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784",
      extension: "jpg",
    },
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1011334",
    comics: {
      available: 12,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/comics",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/comics/21366",
          name: "Avengers: The Initiative (2007) #14",
        },
        {
          resourceURI: "http://gateway.marvel.com/v1/public/comics/24571",
          name: "Avengers: The Initiative (2007) #14 (SPOTLIGHT VARIANT)",
        },
      ],
      returned: 12,
    },
    series: {
      available: 3,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/series",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/series/1945",
          name: "Avengers: The Initiative (2007 - 2010)",
        },
      ],
      returned: 3,
    },
    stories: {
      available: 21,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/stories",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/stories/19947",
          name: "Cover #19947",
          type: "cover",
        },
      ],
      returned: 20,
    },
    events: {
      available: 1,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1011334/events",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/events/269",
          name: "Secret Invasion",
        },
      ],
      returned: 1,
    },
    urls: [
      {
        type: "detail",
        url: "http://marvel.com/characters/74/3-d_man?utm_campaign=apiRef&utm_source=b3e5c564c107530c1520fb3d8372f802",
      },
    ],
  },
  1017100: {
    id: 1017100,
    name: "A-Bomb (HAS)",
    description:
      "Rick Jones has been Hulk's best bud for decades, but now he's more than a friend...he's a teammate! Transformed by the same gamma radiation that turned the Hulk into a monster, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction!",
    modified: "2013-09-18T15:54:04-0400",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
      extension: "jpg",
    },
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1017100",
    comics: {
      available: 4,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1017100/comics",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/comics/47176",
          name: "FREE COMIC BOOK DAY 2013 1 (2013) #1",
        },
      ],
      returned: 4,
    },
    series: {
      available: 2,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1017100/series",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/series/17765",
          name: "FREE COMIC BOOK DAY 2013 1 (2013)",
        },
      ],
      returned: 2,
    },
    stories: {
      available: 7,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1017100/stories",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/stories/105929",
          name: "cover from Free Comic Book Day 2013 (Avengers/Hulk) (2013) #1",
          type: "cover",
        },
      ],
      returned: 7,
    },
    events: {
      available: 0,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1017100/events",
      items: [],
      returned: 0,
    },
    urls: [
      {
        type: "detail",
        url: "http://marvel.com/characters/76/a-bomb?utm_campaign=apiRef&utm_source=b3e5c564c107530c1520fb3d8372f802",
      },
    ],
  },
  1009144: {
    id: 1009144,
    name: "A.I.M.",
    description: "AIM is a terrorist organization bent on destroying the world.",
    modified: "2013-10-17T14:41:30-0400",
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/6/20/52602f21f29ec",
      extension: "jpg",
    },
    resourceURI: "http://gateway.marvel.com/v1/public/characters/1009144",
    comics: {
      available: 53,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1009144/comics",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/comics/36763",
          name: "Ant-Man: Scott Lang (2008) #1",
        },
      ],
      returned: 20,
    },
    series: {
      available: 37,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1009144/series",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/series/13082",
          name: "Ant-Man: Scott Lang (2008)",
        },
      ],
      returned: 20,
    },
    stories: {
      available: 57,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1009144/stories",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/stories/5800",
          name: "Avengers (1998) #67",
          type: "interiorStory",
        },
      ],
      returned: 20,
    },
    events: {
      available: 1,
      collectionURI: "http://gateway.marvel.com/v1/public/characters/1009144/events",
      items: [
        {
          resourceURI: "http://gateway.marvel.com/v1/public/events/269",
          name: "Secret Invasion",
        },
      ],
      returned: 1,
    },
    urls: [
      {
        type: "detail",
        url: "http://marvel.com/characters/77/aim.?utm_campaign=apiRef&utm_source=b3e5c564c107530c1520fb3d8372f802",
      },
    ],
  },
}

// Função para gerar dados mock para qualquer ID
function generateMockCharacter(id: string) {
  const numId = Number.parseInt(id)
  return {
    id: numId,
    name: `Character ${id}`,
    description: `This is a mock character with ID ${id}. The Marvel API is temporarily unavailable.`,
    modified: new Date().toISOString(),
    thumbnail: {
      path: "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg",
    },
    resourceURI: `http://gateway.marvel.com/v1/public/characters/${id}`,
    comics: {
      available: Math.floor(Math.random() * 50) + 1,
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${id}/comics`,
      items: [
        {
          resourceURI: `http://gateway.marvel.com/v1/public/comics/${numId + 1000}`,
          name: `Mock Comic #${numId + 1000}`,
        },
      ],
      returned: 1,
    },
    series: {
      available: Math.floor(Math.random() * 20) + 1,
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${id}/series`,
      items: [
        {
          resourceURI: `http://gateway.marvel.com/v1/public/series/${numId + 500}`,
          name: `Mock Series ${numId + 500}`,
        },
      ],
      returned: 1,
    },
    stories: {
      available: Math.floor(Math.random() * 100) + 1,
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${id}/stories`,
      items: [
        {
          resourceURI: `http://gateway.marvel.com/v1/public/stories/${numId + 2000}`,
          name: `Mock Story ${numId + 2000}`,
          type: "interiorStory",
        },
      ],
      returned: 1,
    },
    events: {
      available: Math.floor(Math.random() * 5),
      collectionURI: `http://gateway.marvel.com/v1/public/characters/${id}/events`,
      items: [],
      returned: 0,
    },
    urls: [
      {
        type: "detail",
        url: `http://marvel.com/characters/${id}/mock-character`,
      },
    ],
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
    })

    const url = `${MARVEL_BASE_URL}/characters/${characterId}?${urlParams}`

    try {
      const response = await fetch(url, {
        headers: {
          "User-Agent": "Marvel-App/1.0",
          Accept: "application/json",
        },
      })


      if (!response.ok) {

        // Usar dados mock específicos se disponíveis, senão gerar genérico
        const mockCharacter = (mockCharacterDetails as Record<number, any>)[Number(characterId)] || generateMockCharacter(characterId)

        return NextResponse.json({
          offset: 0,
          limit: 1,
          total: 1,
          count: 1,
          results: [mockCharacter],
        })
      }

      const data = await response.json()
      return NextResponse.json(data.data)
    } catch (fetchError) {

      // Em caso de erro de rede, retornar dados mock
      const mockCharacter = (mockCharacterDetails as Record<number, any>)[Number(characterId)] || generateMockCharacter(characterId)

      return NextResponse.json({
        offset: 0,
        limit: 1,
        total: 1,
        count: 1,
        results: [mockCharacter],
      })
    }
  } catch (error) {
    console.error("API Route Error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
