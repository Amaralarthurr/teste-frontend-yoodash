"use client"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (newOffset: number) => void
  offset: number
  limit: number
  totalCharacters: number
}

export function Pagination({ currentPage, totalPages, onPageChange, offset, limit, totalCharacters }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={() => onPageChange(offset - limit)}
        disabled={offset === 0}
        className="px-4 py-2 border border-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-100 text-gray-600 font-medium transition-colors"
      >
        Anterior
      </button>
      <span className="px-4 py-2 text-gray-600 font-medium">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={() => onPageChange(offset + limit)}
        disabled={offset + limit >= totalCharacters}
        className="px-4 py-2 border border-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-100 text-gray-600 font-medium transition-colors"
      >
        Próxima
      </button>
    </div>
  )
}
