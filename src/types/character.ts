export interface Character {
  id: number
  name: string
  description: string
  thumbnail: {
    path: string
    extension: string
  }
  comics: {
    available: number
    items: Array<{
      resourceURI: string
      name: string
    }>
  }
  series: {
    available: number
    items: Array<{
      resourceURI: string
      name: string
    }>
  }
  events: {
    available: number
    items: Array<{
      resourceURI: string
      name: string
    }>
  }
  rating?: string | number
  urls: Array<{
    type: string
    url: string
  }>
}

export interface Comic {
  id: number
  title: string
  thumbnail: {
    path: string
    extension: string
  }
  dates: Array<{
    type: string
    date: string
  }>
}

export interface Event {
  id: number
  title: string
  start?: string
  end?: string
  modified?: string
  thumbnail: {
    path: string
    extension: string
  }
}
