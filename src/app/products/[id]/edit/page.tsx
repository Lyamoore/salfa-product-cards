import { Container, Typography } from "@mui/material"
import { fetchProducts } from "@/services/api"
import { EditProductClient } from "./EditProductClient"
import { notFound } from "next/navigation"

export async function generateStaticParams() {
  const products = await fetchProducts()
  return products.map((product) => ({ id: product.id }))
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string }
}) {
  const products = await fetchProducts()
  const product = products.find((item) => item.id === params.id)

  if (!product) {
    notFound()
  }

  return <EditProductClient product={product} />
}
