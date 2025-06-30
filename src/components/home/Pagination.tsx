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

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newOffset = offset - limit
      onPageChange(Math.max(0, newOffset))
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      const newOffset = offset + limit
      onPageChange(newOffset)
    }
  }

  const handlePageClick = (page: number) => {
    const newOffset = (page - 1) * limit
    onPageChange(newOffset)
  }

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) {
    return null
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={offset === 0}
        className="px-4 py-2 border border-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-100 text-gray-600 font-medium transition-colors"
      >
        Anterior
      </button>
      <span className="px-4 py-2 text-gray-600 font-medium">
        Página {currentPage} de {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={offset + limit >= totalCharacters}
        className="px-4 py-2 border border-gray-400 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent-100 text-gray-600 font-medium transition-colors"
      >
        Próxima
      </button>
    </div>
  )
}
