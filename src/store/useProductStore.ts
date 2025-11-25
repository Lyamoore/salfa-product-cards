import { Product } from "@/types/product"
import { create } from "zustand"

interface ProductStore {
  products: Product[],
  setProducts: (products: Product[]) => void,
  toggleLike: (id: string) => void,
  deleteProduct: (id: string) => void,
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  toggleLike:  (id) => set((state) => ({
    products: state.products.map((item) => item.id === id ? {...item, isLiked: !item.isLiked} : item)
  })),

  deleteProduct: (id) => set((state) => ({
    products: state.products.filter((item) => item.id !== id )
  }))
})) 