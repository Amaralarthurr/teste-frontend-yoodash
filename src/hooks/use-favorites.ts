"use client"

import { useState, useEffect } from "react"

export function useFavorites(maxFavorites = 5) {
  const [favorites, setFavorites] = useState<number[]>([])

  useEffect(() => {
    const savedFavorites = localStorage.getItem("marvelFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("marvelFavorites", JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    const handleStorageChange = () => {
      console.log("=== STORAGE CHANGE DETECTED ===")
      const savedFavorites = localStorage.getItem("marvelFavorites")
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites)
        setFavorites(parsedFavorites)
      }
    }

    const handleFavoritesChanged = (event: any) => {
      handleStorageChange()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("favoritesChanged", handleFavoritesChanged)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("favoritesChanged", handleFavoritesChanged)
    }
  }, [])

  const toggleFavorite = (characterId: number) => {

    const newFavorites = favorites.includes(characterId)
      ? favorites.filter((id) => id !== characterId)
      : favorites.length < maxFavorites
        ? [...favorites, characterId]
        : favorites


    setFavorites(newFavorites)
    localStorage.setItem("marvelFavorites", JSON.stringify(newFavorites))

    window.dispatchEvent(
      new CustomEvent("favoritesChanged", {
        detail: { favorites: newFavorites },
      }),
    )
  }

  return { favorites, toggleFavorite }
}
