"use client"

interface NoResultsProps {
  showFavoritesOnly: boolean
  searchTerm: string
  onClearSearch: () => void
}

export function NoResults({ showFavoritesOnly, searchTerm, onClearSearch }: NoResultsProps) {
  return (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg font-medium">
        {showFavoritesOnly
          ? "Nenhum personagem favorito encontrado."
          : searchTerm
            ? `Nenhum personagem encontrado para "${searchTerm}".`
            : "Nenhum personagem encontrado."}
      </p>
      {searchTerm && (
        <button
          onClick={onClearSearch}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
        >
          Limpar Busca
        </button>
      )}
    </div>
  )
}
