import { z } from "zod"

export const createProductSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  species: z.string().min(1, "Вид обязателен"),
  gender: z.enum(["Male", "Female"], {
    message: "Выберите пол",
  }),
  birth: z.string().optional().or(z.literal("")),
  ancestry: z.string().optional().or(z.literal("")),
  house: z.string().optional().or(z.literal("")),
  patronus: z.string().optional().or(z.literal("")),
  actor: z.string().optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
})

export type CreateProductInput = z.infer<typeof createProductSchema>
