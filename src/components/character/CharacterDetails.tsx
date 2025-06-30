"use client"

import Image from "next/image"
import { Heart, Calendar } from "lucide-react"

interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: {
    available: number
  }
  events: {
    available: number
  }
  rating?: string | number
}

interface CharacterDetailsProps {
  character: Character
  isFavorite: boolean
  canToggleFavorite: boolean
  toggleFavorite: () => void
  formatShortDate: (dateString: string) => string
  getLatestComic: () => any
}

export function CharacterDetails({
  character,
  isFavorite,
  canToggleFavorite,
  toggleFavorite,
  formatShortDate,
  getLatestComic,
}: CharacterDetailsProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-8">
      <div className="md:flex">
        <div className="md:w-2/3 p-6 order-1 md:order-1">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-600">{character.name}</h2>
            <button
              onClick={toggleFavorite}
              disabled={!canToggleFavorite}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
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
                className={`w-6 h-6 ${isFavorite ? "fill-red-500" : ""}`}
                style={{
                  fill: isFavorite ? "#ef4444" : "none",
                  color: isFavorite ? "#ef4444" : "currentColor",
                }}
              />
            </button>
          </div>

          {character.description ? (
            <p className="text-gray-600 leading-relaxed mb-6">{character.description}</p>
          ) : (
            <p className="text-gray-500 italic mb-6">Nenhuma descrição disponível para este personagem.</p>
          )}

          <div className="flex items-center gap-14 mb-4">
            <div className="flex items-center flex-col">
              <div className="text-sm text-gray-600 font-bold mb-2">Quadrinhos</div>
              <div className="flex flex-row border w-full gap-2">
                <Image src="/assets/img/livro.png" alt="Livro" width={20} height={20} className="object-contain" />
                <span className="text-lg font-bold text-gray-600">{character.comics?.available || 0}</span>
              </div>
            </div>

            <div className="flex items-center flex-col">
              <div className="text-sm text-gray-600 font-bold mb-2">Filmes</div>
              <div className="flex flex-row border w-full gap-2">
                <Image src="/assets/img/video.png" alt="Livro" width={20} height={20} className="object-contain" />
                <span className="text-lg font-bold text-gray-600">{character.events?.available || 0}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <p className="text-gray-600 font-bold text-sm">Rating: </p>
            <Image src="/assets/img/rating.png" alt="Rating stars" width={64} height={16} className="object-contain" />
            {character.rating && <span className="text-lg font-bold text-gray-600">{character.rating}/10</span>}
          </div>

          <div className="flex gap-2 mb-4 items-start">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-gray-600">Último Quadrinho:</span>
            <span className="text-sm text-gray-600">
              {(() => {
                const latestComic = getLatestComic()
                if (latestComic) {
                  const onSaleDate = latestComic.dates.find((date: any) => date.type === "onsaleDate")
                  if (onSaleDate) {
                    return formatShortDate(onSaleDate.date)
                  }
                }
                return "N/A"
              })()}
            </span>
          </div>
        </div>

        <div className="md:w-1/3 order-2 md:order-2">
          <div className="relative aspect-square">
            <Image
              src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
              alt={character.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
