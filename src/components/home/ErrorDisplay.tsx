"use client"

import { AlertCircle } from "lucide-react"

interface ErrorDisplayProps {
  error: string
  onRetry: () => void
}

export function ErrorDisplay({ error, onRetry }: ErrorDisplayProps) {
  return (
    <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
      <div className="flex items-center gap-2 text-red-800">
        <AlertCircle className="w-5 h-5" />
        <h3 className="font-semibold">Erro ao carregar personagens</h3>
      </div>
      <p className="text-red-700 mt-2">{error}</p>
      <button
        onClick={onRetry}
        className="mt-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
      >
        Tentar novamente
      </button>
    </div>
  )
}
