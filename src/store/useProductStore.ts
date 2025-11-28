import { Product } from "@/types/product"
import { create } from "zustand"

interface ProductStore {
  products: Product[]
  setProducts: (products: Product[]) => void
  upsertProduct: (product: Product) => void
  toggleLike: (id: string) => void
  deleteProduct: (id: string) => void
  createProduct: (product: Omit<Product, "id" | "isLiked">) => void
  updateProduct: (id: string, product: Partial<Omit<Product, "id" | "isLiked">>) => void
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  upsertProduct: (product) =>
    set((state) => {
      const exists = state.products.some((item) => item.id === product.id)
      return exists
        ? {
            products: state.products.map((item) =>
              item.id === product.id ? { ...item, ...product } : item
            ),
          }
        : { products: [...state.products, product] }
    }),

  toggleLike: (id) =>
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id ? { ...item, isLiked: !item.isLiked } : item
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((item) => item.id !== id),
    })),

  createProduct: (product) =>
    set((state) => {
      const newProduct: Product = {
        ...product,
        id: `custom-${Date.now()}`,
        isLiked: false,
      }
      return {
        products: [...state.products, newProduct],
      }
    }),

  updateProduct: (id, product) =>
    set((state) => ({
      products: state.products.map((item) =>
        item.id === id ? { ...item, ...product } : item
      ),
    })),
})) 