"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import DeleteIcon from "@mui/icons-material/Delete"
import { useProductStore } from "@/store/useProductStore"
import { Product } from "@/types/product"
import { DeleteDialog } from "./DeleteDialog"
import { InfoRow } from "./InfoRow"

export const ProductCard = ({ product }: { product: Product }) => {
  const router = useRouter()
  const toggleLike = useProductStore((state) => state.toggleLike)
  const deleteProduct = useProductStore((state) => state.deleteProduct)
  const [open, setOpen] = useState(false)

  const handleCardClick = () => router.push(`/products/${product.id}`)

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleLike(product.id)
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setOpen(true)
  }

  const confirmDelete = () => {
    deleteProduct(product.id)
    setOpen(false)
  }

  return (
    <>
      <Card
        sx={{
          width: 300,
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 4,
          },
        }}
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          height="240"
          image={
            product.image || "https://via.placeholder.com/300x240?text=No+Image"
          }
          alt={product.name}
          sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
        />

        <CardContent sx={{ position: "relative", minHeight: 140, pb: 6 }}>
          <Typography variant="h6" component="div" gutterBottom noWrap>
            {product.name}
          </Typography>

          <InfoRow label="Дом" value={product.house} />
          <InfoRow label="Дата рождения" value={product.birth} />
          <InfoRow label="Актёр" value={product.actor} />

          <Box
            sx={{
              position: "absolute",
              bottom: 8,
              right: 8,
              display: "flex",
              gap: 1,
            }}
          >
            <IconButton
              onClick={handleLikeClick}
              color={product.isLiked ? "error" : "default"}
              size="small"
            >
              {product.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
            <IconButton
              onClick={handleDeleteClick}
              sx={{
                color: "grey.500",
                "&:hover": { color: "error.main" },
              }}
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      <DeleteDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  )
}
