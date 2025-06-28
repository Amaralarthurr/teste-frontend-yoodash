"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart } from "lucide-react"

interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

interface CharactersGridProps {
  characters: Character[]
  favorites: number[]
  toggleFavorite: (characterId: number) => void
  handleCharacterClick: (characterId: number) => void
  maxFavorites: number
}

export function CharactersGrid({
  characters,
  favorites,
  toggleFavorite,
  handleCharacterClick,
  maxFavorites,
}: CharactersGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
      {characters.map((character) => {
        const isFavorite = favorites.includes(character.id)
        const canToggleFavorite = isFavorite || favorites.length < maxFavorites

        return (
          <div key={character.id} className="bg-white rounded-lg overflow-hidden hover transition-all duration-300">
            <Link href={`/character/${character.id}`} onClick={() => handleCharacterClick(character.id)}>
              <div className="relative aspect-square">
                <Image
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  fill
                  className="object-cover transition-transform duration-300"
                />
              </div>
            </Link>

            <div className="p-4">
              <div className="flex justify-between items-center">
                <Link href={`/character/${character.id}`} onClick={() => handleCharacterClick(character.id)}>
                  <h3 className="font-semibold text-gray-600 hover:text-primary transition-colors line-clamp-2 flex-1 pr-2">
                    {character.name}
                  </h3>
                </Link>

                <button
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    toggleFavorite(character.id)
                  }}
                  disabled={!canToggleFavorite}
                  className={`p-2 rounded-full transition-all duration-200 hover:scale-105 ${
                    isFavorite
                      ? "text-red-500 hover:text-red-600 bg-red-50"
                      : canToggleFavorite
                        ? "text-gray-500 hover:text-red-500 hover:bg-gray-50"
                        : "text-gray-400 cursor-not-allowed"
                  }`}
                  title={
                    isFavorite
                      ? "Remover dos favoritos"
                      : canToggleFavorite
                        ? "Adicionar aos favoritos"
                        : "Limite máximo de favoritos atingido"
                  }
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`}
                    style={{
                      fill: isFavorite ? "#ef4444" : "none",
                      color: isFavorite ? "#ef4444" : "currentColor",
                    }}
                  />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
