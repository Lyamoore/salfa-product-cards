export interface Product {
  id: string
  name: string
  birth: string
  house: string
  actor: string
  image: string
  isLiked: boolean
  species?: string
  gender?: string
  ancestry?: string
  patronus?: string
  wand?: {
    wood: string
    core: string
    length: number | null
  }
}
