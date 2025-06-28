"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

export function useCharacterSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("=== SEARCH DEBUG ===")
    console.log("Search term:", searchTerm)

    if (searchTerm.trim()) {
      const searchUrl = `/?nameStartsWith=${encodeURIComponent(searchTerm.trim())}`
      console.log("Redirecting to:", searchUrl)
      router.push(searchUrl)
    } else {
      console.log("Empty search, redirecting to home")
      router.push("/")
    }
  }

  return {
    searchTerm,
    setSearchTerm,
    handleSearch,
  }
}
