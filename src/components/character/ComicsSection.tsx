"use client"

import Image from "next/image"
import { Calendar } from "lucide-react"

interface Comic {
  id: number
  title: string
  thumbnail: {
    path: string
    extension: string
  }
  dates: Array<{
    type: string
    date: string
  }>
}

interface ComicsSectionProps {
  displayedComics: Comic[]
  formatDate: (dateString: string) => string
  characterId: string
  setComics: (comics: Comic[]) => void
}

export function ComicsSection({ displayedComics, formatDate, characterId, setComics }: ComicsSectionProps) {
  return (
    <div className="bg-white rounded-lg p-6">
      <h3 className="text-xl font-bold text-gray-600 mb-6 flex items-center gap-2">Últimos lançamentos</h3>

      {displayedComics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayedComics.map((comic) => {
            const onSaleDate = comic.dates.find((date) => date.type === "onsaleDate")
            return (
              <div key={comic.id} className="group">
                <div className="relative aspect-[2/3] mb-3 overflow-hidden rounded-lg">
                  <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="font-medium text-gray-600 text-sm line-clamp-2 mb-1">{comic.title}</h4>
                {onSaleDate && (
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    {formatDate(onSaleDate.date)}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-gray-500 text-lg font-medium mb-2">
            Nenhum quadrinho encontrado para este personagem.
          </div>
          <div className="text-sm text-gray-400">
            Isso pode acontecer se o personagem não tem quadrinhos disponíveis na API Marvel ou se há um problema na
            conexão.
          </div>
          <button
            onClick={() => {
              console.log("Retrying comics fetch for character:", characterId)
              // Re-fetch comics
              fetch(`/api/character/${characterId}/comics`)
                .then((res) => res.json())
                .then((data) => {
                  console.log("Retry comics result:", data)
                  if (data.results) {
                    setComics(data.results)
                  }
                })
                .catch((err) => console.error("Retry failed:", err))
            }}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
          >
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  )
}
