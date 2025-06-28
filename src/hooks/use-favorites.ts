"use client"

import { useState, useEffect } from "react"

export function useFavorites(maxFavorites = 5) {
  const [favorites, setFavorites] = useState<number[]>([])

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("marvelFavorites")
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites))
    }
  }, [])

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("marvelFavorites", JSON.stringify(favorites))
  }, [favorites])

  // Sync favorites across pages
  useEffect(() => {
    const handleStorageChange = () => {
      console.log("=== STORAGE CHANGE DETECTED ===")
      const savedFavorites = localStorage.getItem("marvelFavorites")
      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites)
        console.log("Updated favorites from storage:", parsedFavorites)
        setFavorites(parsedFavorites)
      }
    }

    const handleFavoritesChanged = (event: any) => {
      console.log("=== FAVORITES CHANGED EVENT ===")
      console.log("Event detail:", event.detail)
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
    console.log("=== HOMEPAGE TOGGLE FAVORITE ===")
    console.log("Character ID:", characterId)
    console.log("Current favorites:", favorites)

    const newFavorites = favorites.includes(characterId)
      ? favorites.filter((id) => id !== characterId)
      : favorites.length < maxFavorites
        ? [...favorites, characterId]
        : favorites

    console.log("New favorites:", newFavorites)

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
