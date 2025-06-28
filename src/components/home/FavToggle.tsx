"use client"

import Image from "next/image"

interface FavToggleProps {
  showFavoritesOnly: boolean
  toggleFavoritesFilter: () => void
}

export function FavToggle({ showFavoritesOnly, toggleFavoritesFilter }: FavToggleProps) {
  return (
    <button
      onClick={toggleFavoritesFilter}
      className="transition-transform duration-200 hover:scale-110"
      title={showFavoritesOnly ? "Mostrar todos os personagens" : "Mostrar apenas favoritos"}
    >
      <Image
        src={showFavoritesOnly ? "/assets/img/toggleDireita.png" : "/assets/img/toggleEsquerda.png"}
        alt={showFavoritesOnly ? "Toggle ativo - favoritos" : "Toggle inativo - todos"}
        width={44}
        height={24}
        className="object-contain"
      />
    </button>
  )
}
