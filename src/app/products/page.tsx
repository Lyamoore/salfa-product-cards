"use client"

import { useEffect, useState } from "react"
import { Box, Container, ToggleButtonGroup, ToggleButton } from "@mui/material"
import { fetchProducts } from "@/services/api"
import { useProductStore } from "@/store/useProductStore"
import { ProductCard } from "@/components/ProductCard"

export default function ProductsPage() {
  const products = useProductStore((state) => state.products)
  const setProducts = useProductStore((state) => state.setProducts)
  const [filter, setFilter] = useState<"all" | "liked">("all")

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts().then(setProducts)
    }
  }, [products.length, setProducts])

  const filteredProducts =
    filter === "liked" ? products.filter((p) => p.isLiked) : products

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(_, newFilter) => newFilter && setFilter(newFilter)}
          aria-label="product filter"
        >
          <ToggleButton value="all">Все</ToggleButton>
          <ToggleButton value="liked">Избранное</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Box>
    </Container>
  )
}
