"use client"

import type React from "react"
import Image from "next/image"

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  handleSearch: (e: React.FormEvent) => void
}

export function SearchFilters({ searchTerm, setSearchTerm, handleSearch }: SearchFiltersProps) {
  return (
    <div className="mb-8 flex flex-col items-center">
      <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md ml-8 min-w-3/4">
        <div className="flex-1 relative">
          <Image
            src="/assets/img/lupa.png"
            alt="Lupa buscar"
            width={20}
            height={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Procure por heróis"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="min-w-full pl-15 pr-4 py-2 rounded-lg border-transparent bg-white text-[#404040] placeholder:text-[#ff1510]"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors font-medium"
        >
          Buscar
        </button>
      </form>
    </div>
  )
}
