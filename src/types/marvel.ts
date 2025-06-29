export interface Thumbnail {
  path: string
  extension: string
}

export interface ResourceList {
  available: number
  returned: number
  collectionURI: string
  items: Array<{
    resourceURI: string
    name: string
  }>
}

export interface Character {
  id: number
  name: string
  description: string
  modified: string
  resourceURI: string
  urls: Array<{
    type: string
    url: string
  }>
  thumbnail: Thumbnail
  comics: ResourceList
  stories: ResourceList
  events: ResourceList
  series: ResourceList
}

export interface Comic {
  id: number
  digitalId: number
  title: string
  issueNumber: number
  variantDescription: string
  description: string
  modified: string
  isbn: string
  upc: string
  diamondCode: string
  ean: string
  issn: string
  format: string
  pageCount: number
  textObjects: Array<{
    type: string
    language: string
    text: string
  }>
  resourceURI: string
  urls: Array<{
    type: string
    url: string
  }>
  series: {
    resourceURI: string
    name: string
  }
  variants: Array<{
    resourceURI: string
    name: string
  }>
  collections: Array<{
    resourceURI: string
    name: string
  }>
  collectedIssues: Array<{
    resourceURI: string
    name: string
  }>
  dates: Array<{
    type: string
    date: string
  }>
  prices: Array<{
    type: string
    price: number
  }>
  thumbnail: Thumbnail
  images: Thumbnail[]
  creators: ResourceList
  characters: ResourceList
  stories: ResourceList
  events: ResourceList
}

export interface MarvelResponse<T> {
  code: number
  status: string
  copyright: string
  attributionText: string
  attributionHTML: string
  data: {
    offset: number
    limit: number
    total: number
    count: number
    results: T[]
  }
  etag: string
}
