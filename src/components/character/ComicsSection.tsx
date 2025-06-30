"use client"

import Image from "next/image"
import { Calendar, RefreshCw } from "lucide-react"

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
  const handleRetryComics = async () => {
    try {
      const response = await fetch(`/api/character/${characterId}/comics`)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Comics retry failed:", errorData)
        alert(`Erro ao buscar quadrinhos: ${errorData.error || "Erro desconhecido"}`)
        return
      }

      const data = await response.json()

      if (data.results && Array.isArray(data.results)) {
        setComics(data.results)
      } else {
        console.warn("No comics results in retry response")
        alert("Nenhum quadrinho encontrado para este personagem")
      }
    } catch (err) {
      console.error("Retry failed:", err)
      alert("Erro de rede ao tentar buscar quadrinhos")
    }
  }

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-600">Últimos lançamentos</h3>
      </div>

      {displayedComics.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {displayedComics.map((comic) => {
            const onSaleDate = comic.dates?.find((date) => date.type === "onsaleDate")

            return (
              <div key={comic.id} className="group">
                <div className="relative aspect-[2/3] mb-3 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                    alt={comic.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.warn("Failed to load comic image:", comic.thumbnail)
                    }}
                  />
                </div>
                <h4 className="font-medium text-gray-600 text-sm line-clamp-2 mb-1 min-h-[2.5rem]">{comic.title}</h4>
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
          <div className="text-gray-500 text-lg font-medium mb-2">Nenhum quadrinho encontrado</div>
          <div className="text-sm text-gray-400 mb-4">
            Este personagem pode não ter quadrinhos disponíveis na API da Marvel
          </div>
          <button
            onClick={handleRetryComics}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar Novamente
          </button>
        </div>
      )}
    </div>
  )
}
