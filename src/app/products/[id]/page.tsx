import { Container } from "@mui/material"
import { notFound } from "next/navigation"
import { fetchProducts } from "@/services/api"
import { ProductDetailClient } from "./ProductDetailClient"

export async function generateStaticParams() {
  const products = await fetchProducts()
  return products.map((product) => ({ id: product.id }))
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const products = await fetchProducts()
  const product = products.find((item) => item.id === params.id)

  if (!product) {
    notFound()
  }

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <ProductDetailClient product={product} />
    </Container>
  )
}
