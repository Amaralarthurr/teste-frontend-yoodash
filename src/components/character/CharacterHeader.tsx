"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface MainHeaderProps {
  characterName: string
  searchTerm: string
  setSearchTerm: (term: string) => void
  handleSearch: (e: React.FormEvent) => void
}

export function MainHeader({ characterName, searchTerm, setSearchTerm, handleSearch }: MainHeaderProps) {
  return (
    <header className="bg-primary text-white ">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-start gap-6 mb-4">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
            <Image src="/assets/img/logo.png" alt="Logo Marvel" width={200} height={60} className="object-contain" />
          </Link>
          <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md ml-8">
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2
                       focus:ring-white focus:border-transparent bg-white text-gray-600"
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
        <div className="flex items-center gap-2 text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-white hover:text-gray-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar aos Personagens
          </Link>
          <span className="text-gray-300">•</span>
          <h1 className="text-xl font-bold">{characterName}</h1>
        </div>
      </div>
    </header>
  )
}
