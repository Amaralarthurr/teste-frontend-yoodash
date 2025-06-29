export interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
}

export interface Comic {
  id: number
  title: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  dates: Array<{
    type: string
    date: string
  }>
}

export interface MarvelApiResponse<T> {
  code: number
  status: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: T[]
  }
}

export interface FavoritesState {
  favorites: number[]
  maxFavorites: number
}
