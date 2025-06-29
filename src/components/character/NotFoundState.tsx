import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface NotFoundStateProps {
  characterId: string
}

export function NotFoundState({ characterId }: NotFoundStateProps) {
  return (
    <div className="min-h-screen bg-accent-50 flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-600 mb-4">Personagem não encontrado</h1>
        <p className="text-gray-500 mb-4">O personagem com ID {characterId} não foi encontrado.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar aos Personagens
        </Link>
      </div>
    </div>
  )
}
