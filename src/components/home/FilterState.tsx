import Image from "next/image"

interface FilterStateProps {
  showFavoritesOnly: boolean
}

export function FilterState({ showFavoritesOnly }: FilterStateProps) {
  return (
    <div className="flex items-center gap-2 ml-2">
      <Image
        src={showFavoritesOnly ? "/assets/img/coracao.png" : "/assets/img/coracaoVazio.png"}
        alt={showFavoritesOnly ? "Coração cheio" : "Coração vazio"}
        width={16}
        height={16}
        className="object-contain"
      />
      <span className="text-[#ff1510] font-medium text-sm">
        {showFavoritesOnly ? "Somente favoritos" : "mostrando todos os personagens"}
      </span>
    </div>
  )
}
