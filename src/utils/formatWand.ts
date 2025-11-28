import { Product } from "@/types/product"

export const formatWand = (wand: Product["wand"]): string => {
  if (!wand?.wood) return ""

  const parts = [wand.wood]
  if (wand.core) parts.push(`ядро: ${wand.core}`)
  if (wand.length) parts.push(`длина: ${wand.length} дюймов`)

  return parts.join(", ")
}
