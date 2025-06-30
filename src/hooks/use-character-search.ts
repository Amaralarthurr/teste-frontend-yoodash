"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function useCharacterSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchTerm.trim()) {
      const searchUrl = `/?nameStartsWith=${encodeURIComponent(searchTerm.trim())}`
      router.push(searchUrl)
    } else {
      router.push("/")
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
  }
}
