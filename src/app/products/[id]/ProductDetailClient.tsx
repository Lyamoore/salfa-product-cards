"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardMedia, CardContent, Box, Chip, Divider } from "@mui/material"
import { Product } from "@/types/product"
import { useProductStore } from "@/store/useProductStore"
import { DeleteDialog } from "@/components/DeleteDialog"
import { BackButton } from "@/components/BackButton"
import { InfoRow } from "@/components/InfoRow"
import { InfoSection } from "@/components/InfoSection"
import { ProductHeader } from "@/components/ProductHeader"
import { formatWand } from "@/utils/formatWand"

interface ProductDetailClientProps {
  product: Product
}

export const ProductDetailClient = ({ product }: ProductDetailClientProps) => {
  const router = useRouter()
  const toggleLike = useProductStore((state) => state.toggleLike)
  const deleteProduct = useProductStore((state) => state.deleteProduct)
  const upsertProduct = useProductStore((state) => state.upsertProduct)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    upsertProduct(product)
  }, [product, upsertProduct])

  const handleDelete = () => setOpen(true)
  const confirmDelete = () => {
    deleteProduct(product.id)
    setOpen(false)
    router.push("/products")
  }

  return (
    <Box>
      <BackButton href="/products" />

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
    </Box>
  )
}
