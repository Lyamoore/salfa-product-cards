import axios from "axios"
import { HP_API } from "@/utils/constants"
import { Product } from "@/types/product"

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get(HP_API)

  return response.data.map((item) => ({
    id: item.id,
    name: item.name,
    birth: item.dateOfBirth || "",
    house: item.house || "",
    actor: item.actor || "",
    image: item.image || "",
    isLiked: false,
  }))
}