"use client"

import { useState } from "react"
import { use } from "react"
import { useRouter } from "next/navigation"
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
} from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useProductStore } from "@/store/useProductStore"
import { DeleteDialog } from "@/components/DeleteDialog"
import { InfoRow } from "@/components/InfoRow"
import { InfoSection } from "@/components/InfoSection"
import { ProductHeader } from "@/components/ProductHeader"
import { formatWand } from "@/utils/formatWand"

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const products = useProductStore((state) => state.products)
  const toggleLike = useProductStore((state) => state.toggleLike)
  const deleteProduct = useProductStore((state) => state.deleteProduct)
  const [open, setOpen] = useState(false)

  const product = products.find((p) => p.id === id)

  const handleDelete = () => setOpen(true)
  const confirmDelete = () => {
    deleteProduct(id)
    setOpen(false)
    router.push("/products")
  }

  if (!product) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h4">Продукт не найден</Typography>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push("/products")}
          sx={{ mt: 2 }}
        >
          Вернуться к списку
        </Button>
      </Container>
    )
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={() => router.push("/products")}
        sx={{ mb: 3 }}
      >
        Назад к списку
      </Button>

      <Card sx={{ maxWidth: 800, mx: "auto" }}>
        <CardMedia
          component="img"
          image={
            product.image || "https://via.placeholder.com/800x600?text=No+Image"
          }
          alt={product.name}
          sx={{
            width: "100%",
            maxHeight: 500,
            objectFit: "contain",
            backgroundColor: "#f5f5f5",
          }}
        />

        <CardContent>
          <ProductHeader
            product={product}
            onToggleLike={toggleLike}
            onDelete={handleDelete}
          />

          {product.house && (
            <Box sx={{ mb: 2 }}>
              <Chip label={product.house} color="primary" />
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <InfoSection title="Основная информация" showDivider={false}>
            <InfoRow label="Вид" value={product.species} variant="body1" bold />
            <InfoRow label="Пол" value={product.gender} variant="body1" bold />
            <InfoRow
              label="Дата рождения"
              value={product.birth}
              variant="body1"
              bold
            />
            <InfoRow
              label="Происхождение"
              value={product.ancestry}
              variant="body1"
              bold
            />
          </InfoSection>

          {(product.patronus || (product.wand && product.wand.wood)) && (
            <InfoSection title="Магия">
              <InfoRow
                label="Патронус"
                value={product.patronus}
                variant="body1"
                bold
              />
              {product.wand?.wood && (
                <InfoRow
                  label="Волшебная палочка"
                  value={formatWand(product.wand)}
                  variant="body1"
                  bold
                />
              )}
            </InfoSection>
          )}

          {product.actor && (
            <InfoSection title="В фильмах">
              <InfoRow
                label="Актёр"
                value={product.actor}
                variant="body1"
                bold
              />
            </InfoSection>
          )}
        </CardContent>
      </Card>

      <DeleteDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  )
}
