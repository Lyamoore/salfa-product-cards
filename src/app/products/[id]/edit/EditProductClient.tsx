"use client"

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Container, Paper, Box, Typography, Alert } from "@mui/material"
import { useProductStore } from "@/store/useProductStore"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createProductSchema, type CreateProductInput } from "@/utils/schemas"
import { BackButton } from "@/components/BackButton"
import { FormField } from "@/components/FormField"
import { FormActions } from "@/components/FormActions"
import { GENDER_OPTIONS, FORM_FIELDS } from "@/utils/constants"
import { Product } from "@/types/product"

interface EditProductClientProps {
  product: Product
}

export const EditProductClient = ({ product }: EditProductClientProps) => {
  const router = useRouter()
  const updateProduct = useProductStore((state) => state.updateProduct)
  const upsertProduct = useProductStore((state) => state.upsertProduct)

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateProductInput>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      species: "",
      gender: undefined,
      birth: "",
      ancestry: "",
      house: "",
      patronus: "",
      actor: "",
      image: "",
    },
  })

  useEffect(() => {
    upsertProduct(product)
    reset({
      name: product.name || "",
      species: product.species || "",
      gender:
        product.gender === "Male" || product.gender === "Female"
          ? product.gender
          : undefined,
      birth: product.birth || "",
      ancestry: product.ancestry || "",
      house: product.house || "",
      patronus: product.patronus || "",
      actor: product.actor || "",
      image: product.image || "",
    })
  }, [product, reset, upsertProduct])

  const onSubmit = (data: CreateProductInput) => {
    updateProduct(product.id, {
      name: data.name,
      species: data.species,
      gender: data.gender,
      birth: data.birth || "",
      ancestry: data.ancestry || "",
      house: data.house || "",
      patronus: data.patronus || "",
      actor: data.actor || "",
      image: data.image || "",
    })
    router.push(`/products/${product.id}`)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Редактировать персонажа
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
            {FORM_FIELDS.map((field) => {
              const fieldName = field.name as keyof CreateProductInput
              return (
                <FormField
                  key={fieldName}
                  name={fieldName}
                  control={control}
                  label={field.label}
                  placeholder={field.placeholder}
                  error={errors[fieldName]?.message}
                  type={field.type === "select" ? "select" : "text"}
                  options={field.type === "select" ? GENDER_OPTIONS : undefined}
                  isSubmitting={isSubmitting}
                  required={field.required}
                />
              )
            })}

            <Alert severity="info">
              Поля, отмеченные звёздочкой (*), обязательны
            </Alert>

            <FormActions
              onSubmit={handleSubmit(onSubmit)}
              onCancel={() => router.push(`/products/${product.id}`)}
              isSubmitting={isSubmitting}
              submitLabel="Принять"
            />
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

