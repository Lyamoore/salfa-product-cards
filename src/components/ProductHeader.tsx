"use client"

import { Box, Typography, IconButton } from "@mui/material"
import FavoriteIcon from "@mui/icons-material/Favorite"
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { Product } from "@/types/product"
import { useRouter } from "next/navigation"

interface ProductHeaderProps {
  product: Product
  onToggleLike: (id: string) => void
  onDelete: () => void
}

export const ProductHeader = ({
  product,
  onToggleLike,
  onDelete,
}: ProductHeaderProps) => {
  const router = useRouter()

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography variant="h3" component="h1">
        {product.name}
      </Typography>
      <Box>
        <IconButton
          onClick={() => onToggleLike(product.id)}
          color={product.isLiked ? "error" : "default"}
        >
          {product.isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton
          onClick={() => router.push(`/products/${product.id}/edit`)}
          sx={{
            color: "grey.500",
            "&:hover": { color: "primary.main" },
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={onDelete}
          sx={{
            color: "grey.500",
            "&:hover": { color: "error.main" },
          }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
