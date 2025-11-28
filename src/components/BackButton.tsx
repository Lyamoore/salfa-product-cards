"use client"

import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useRouter } from "next/navigation"
import { AppButton } from "./AppButton"

interface BackButtonProps {
  href: string
  label?: string
}

export const BackButton = ({
  href,
  label = "Назад к списку",
}: BackButtonProps) => {
  const router = useRouter()

  return (
    <AppButton
      variant="outlined"
      icon={<ArrowBackIcon />}
      onClick={() => router.push(href)}
      sx={{ mb: 3 }}
    >
      {label}
      <p></p>
    </AppButton>
  )
}
