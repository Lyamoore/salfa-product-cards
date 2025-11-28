"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Paper, Box, Typography, Alert } from "@mui/material"
import { useRouter } from "next/navigation"
import { createProductSchema, type CreateProductInput } from "@/utils/schemas"
import { useProductStore } from "@/store/useProductStore"
import { FormField } from "./FormField"
import { FormActions } from "./FormActions"
import { GENDER_OPTIONS, FORM_FIELDS } from "@/utils/constants"

export const CreateProductForm = () => {
  const router = useRouter()
  const createProduct = useProductStore((state) => state.createProduct)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
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

  const onSubmit = (data: CreateProductInput) => {
    createProduct({
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
    router.push("/products")
  }

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
        Создать персонажа
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
            onCancel={() => router.push("/products")}
            isSubmitting={isSubmitting}
          />
        </Box>
      </form>
    </Paper>
  )
}
