"use client"

import { useEffect, useState } from "react"
import {
  Box,
  Container,
  ToggleButtonGroup,
  ToggleButton,
  TextField,
  InputAdornment,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { fetchProducts } from "@/services/api"
import { useProductStore } from "@/store/useProductStore"
import { ProductCard } from "@/components/ProductCard"
import { AppButton } from "@/components/AppButton"
import { useRouter } from "next/navigation"
import AddIcon from "@mui/icons-material/Add"

export default function ProductsPage() {
  const products = useProductStore((state) => state.products)
  const setProducts = useProductStore((state) => state.setProducts)
  const [filter, setFilter] = useState<"all" | "liked" | "custom">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts().then(setProducts)
    }
  }, [products.length, setProducts])

  let filteredProducts = products

  if (filter === "liked") {
    filteredProducts = filteredProducts.filter((p) => p.isLiked)
  } else if (filter === "custom") {
    filteredProducts = filteredProducts.filter((p) =>
      p.id.startsWith("custom-")
    )
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase()
    filteredProducts = filteredProducts.filter((p) => {
      const name = p.name?.toLowerCase() || ""
      const species = p.species?.toLowerCase() || ""
      const gender = p.gender?.toLowerCase() || ""
      const house = p.house?.toLowerCase() || ""
      const actor = p.actor?.toLowerCase() || ""
      const patronus = p.patronus?.toLowerCase() || ""
      const ancestry = p.ancestry?.toLowerCase() || ""

      return (
        name.includes(query) ||
        species.includes(query) ||
        gender.includes(query) ||
        house.includes(query) ||
        actor.includes(query) ||
        patronus.includes(query) ||
        ancestry.includes(query)
      )
    })
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(_, newFilter) => newFilter && setFilter(newFilter)}
            aria-label="product filter"
          >
            <ToggleButton value="all">Все</ToggleButton>
            <ToggleButton value="liked">Избранное</ToggleButton>
            <ToggleButton value="custom">Созданные вручную</ToggleButton>
          </ToggleButtonGroup>

          <TextField
            placeholder="Поиск..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250 }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <AppButton
            variant="primary"
            icon={<AddIcon />}
            onClick={() => router.push("/create-product")}
          >
            Создать продукт
          </AppButton>
        </Box>
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
