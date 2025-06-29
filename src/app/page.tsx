"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { MainHeader } from "@/components/home/MainHeader"
import { ErrorDisplay } from "@/components/home/ErrorDisplay"
import { SearchFilters } from "@/components/home/SearchFilters"
import { ControlsSection } from "@/components/home/ControlsSection"
import { LoadingState } from "@/components/home/LoadingState"
import { CharactersGrid } from "@/components/home/CharactersGrid"
import { Pagination } from "@/components/home/Pagination"
import { NoResults } from "@/components/home/NoResults"
import { Footer } from "@/components/character/Footer"
import { useFavorites } from "@/hooks/use-favorites"
import { useCharacters } from "@/hooks/use-characters"

export default function HomePage() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const LIMIT = 20
  const MAX_FAVORITES = 5

  const { favorites, toggleFavorite } = useFavorites(MAX_FAVORITES)
  const { characters, loading, searchTerm, setSearchTerm, offset, setOffset, totalCharacters, error, fetchCharacters } =
    useCharacters(LIMIT)

  const filteredAndSortedCharacters = useMemo(() => {
    let filtered = characters

    if (showFavoritesOnly) {
      filtered = characters.filter((char) => favorites.includes(char.id))
    }

    return filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name)
      } else {
        return b.name.localeCompare(a.name)
      }
    })
  }, [characters, favorites, showFavoritesOnly, sortOrder])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setOffset(0)
    fetchCharacters(searchTerm, 0)
  }

  const handlePageChange = (newOffset: number) => {
    setOffset(newOffset)
    window.scrollTo(0, 0)
  }

  const handleCharacterClick = (characterId: number) => {}

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
  }

  const toggleFavoritesFilter = () => {
    setShowFavoritesOnly((prev) => !prev)
  }

  const handleClearSearch = () => {
    setSearchTerm("")
    setOffset(0)
    fetchCharacters("", 0)
  }

  const handleRetry = () => {
    fetchCharacters(searchTerm, offset)
  }

  const totalPages = Math.ceil(totalCharacters / LIMIT)
  const currentPage = Math.floor(offset / LIMIT) + 1

  return (
    <div className="min-h-screen bg-[#e7f6e7] font-sans">
      <MainHeader />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {error && <ErrorDisplay error={error} onRetry={handleRetry} />}

        <SearchFilters searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

        <ControlsSection
          showFavoritesOnly={showFavoritesOnly}
          filteredCount={filteredAndSortedCharacters.length}
          charactersCount={characters.length}
          sortOrder={sortOrder}
          toggleSortOrder={toggleSortOrder}
          toggleFavoritesFilter={toggleFavoritesFilter}
        />

        {loading && <LoadingState />}

        {!loading && !error && (
          <>
            <CharactersGrid
              characters={filteredAndSortedCharacters}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
              handleCharacterClick={handleCharacterClick}
              maxFavorites={MAX_FAVORITES}
            />

            {!showFavoritesOnly && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                offset={offset}
                limit={LIMIT}
                totalCharacters={totalCharacters}
              />
            )}

            {filteredAndSortedCharacters.length === 0 && !loading && (
              <NoResults
                showFavoritesOnly={showFavoritesOnly}
                searchTerm={searchTerm}
                onClearSearch={handleClearSearch}
              />
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  )
}