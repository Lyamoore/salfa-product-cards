"use client"

import { use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Container, Paper, Box, Alert } from "@mui/material"
import { useProductStore } from "@/store/useProductStore"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createProductSchema, type CreateProductInput } from "@/utils/schemas"
import { BackButton } from "@/components/BackButton"
import { FormField } from "@/components/FormField"
import { FormActions } from "@/components/FormActions"
import { InfoRow } from "@/components/InfoRow"
import { GENDER_OPTIONS, FORM_FIELDS } from "@/utils/constants"

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const products = useProductStore((state) => state.products)
  const updateProduct = useProductStore((state) => state.updateProduct)

  const product = products.find((p) => p.id === id)

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
    if (product) {
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
    }
  }, [product, reset])

  if (!product) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <InfoRow label="" value="Продукт не найден" variant="h4" />
        <BackButton href="/products" label="Вернуться к списку" />
      </Container>
    )
  }

  const onSubmit = (data: CreateProductInput) => {
    updateProduct(id, {
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
    router.push(`/products/${id}`)
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <InfoRow label="" value="Редактировать персонажа" variant="h4" />
        </Box>

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
              onCancel={() => router.push(`/products/${id}`)}
              isSubmitting={isSubmitting}
              submitLabel="Принять"
            />
          </Box>
        </form>
      </Paper>
    </Container>
  )
}
