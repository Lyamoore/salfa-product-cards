"use client"

import { Container } from "@mui/material"
import { CreateProductForm } from "@/components/CreateProductForm"

export default function CreateProductPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <CreateProductForm />
    </Container>
  )
}
