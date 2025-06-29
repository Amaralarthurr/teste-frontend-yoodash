"use client"

import { useParams } from "next/navigation"
import { MainHeader } from "@/components/character/CharacterHeader"
import { CharacterDetails } from "@/components/character/CharacterDetails"
import { ComicsSection } from "@/components/character/ComicsSection"
import { Footer } from "@/components/character/Footer"
import { LoadingState } from "@/components/character/LoadingState"
import { NotFoundState } from "@/components/character/NotFoundState"
import { useFavorites } from "@/hooks/use-favorites"
import { useCharacterDetail } from "@/hooks/use-character-detail"
import { useCharacterSearch } from "@/hooks/use-character-search"
import { formatDate, formatShortDate } from "@/utils/date-formatters"

const MAX_FAVORITES = 5

export default function CharacterDetailPage() {
  const params = useParams()
  const characterId = params.id as string

  console.log("=== CHARACTER PAGE RENDER ===")
  console.log("Character ID from params:", characterId)

  const { favorites, toggleFavorite } = useFavorites(MAX_FAVORITES)
  const { character, loading,  setComics, getLatestComic, displayedComics } =
    useCharacterDetail(characterId)
  const { searchTerm, setSearchTerm, handleSearch } = useCharacterSearch()

  console.log("Page state:", {
    loading,
    hasCharacter: !!character,
    characterName: character?.name,
    comicsCount: displayedComics.length,
  })

  if (loading) {
    console.log("Showing loading state")
    return <LoadingState />
  }

  if (!loading && !character) {
    console.log("Showing not found state")
    return <NotFoundState characterId={characterId} />
  }

  console.log("Showing character details for:", character?.name)
  const isFavorite = favorites.includes(character!.id)

  return (
    <div className="min-h-screen bg-[#e7f6e7] font-sans">
      <MainHeader
        characterName={character!.name}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <CharacterDetails
          character={character!}
          isFavorite={isFavorite}
          canToggleFavorite={isFavorite || favorites.length < MAX_FAVORITES}
          toggleFavorite={() => toggleFavorite(character!.id)}
          formatShortDate={formatShortDate}
          getLatestComic={getLatestComic}
        />

        <ComicsSection
          displayedComics={displayedComics}
          formatDate={formatDate}
          characterId={characterId}
          setComics={setComics}
        />
      </main>

      <Footer />
    </div>
  )
}
