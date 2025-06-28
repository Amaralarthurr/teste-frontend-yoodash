"use client"

import Image from "next/image"
import { FavToggle } from "./FavToggle"
import { FilterState } from "./FilterState"

interface ControlsSectionProps {
  showFavoritesOnly: boolean
  filteredCount: number
  charactersCount: number
  sortOrder: "asc" | "desc"
  toggleSortOrder: () => void
  toggleFavoritesFilter: () => void
}

export function ControlsSection({
  showFavoritesOnly,
  filteredCount,
  charactersCount,
  sortOrder,
  toggleSortOrder,
  toggleFavoritesFilter,
}: ControlsSectionProps) {
  return (
    <div className="mb-8 space-y-4 flex flex-row justify-between">
      <div className="flex">
        <h1 className="text-[#b9b9b9] font-bold text-lg h-full">
          Encontrados {showFavoritesOnly ? filteredCount : Math.min(charactersCount, 20)} heróis
        </h1>
      </div>

      <div className="flex flex-wrap gap-16 items-center">
        <div className="flex items-center gap-4">
          <Image src="/assets/img/heroi.png" alt="super-herói" width={20} height={20} className="object-contain" />
          <button
            onClick={toggleSortOrder}
            className="px-4 py-2 rounded-lg bg-white text-[#ff1510] hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
          >
            <span>Ordenar por nome - {sortOrder === "asc" ? "A/Z" : "Z/A"}</span>
          </button>

          <FavToggle showFavoritesOnly={showFavoritesOnly} toggleFavoritesFilter={toggleFavoritesFilter} />

          <FilterState showFavoritesOnly={showFavoritesOnly} />
        </div>
      </div>
    </div>
  )
}
