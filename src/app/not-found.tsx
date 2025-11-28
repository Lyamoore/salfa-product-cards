"use client"

import { Box, Container } from "@mui/material"
import { AppButton } from "@/components/AppButton"
import { InfoRow } from "@/components/InfoRow"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  return (
    <Container sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Box
          sx={{
            mb: 2,
          }}
        >
          <InfoRow label="" value="404" variant="h1" bold />
        </Box>
        <InfoRow label="" value="Страница не найдена" variant="h4" bold />
        <InfoRow
          label=""
          value="К сожалению, запрашиваемая страница не существует."
          variant="body1"
        />
        <AppButton
          variant="primary"
          onClick={() => router.push("/")}
          sx={{ mt: 2 }}
        >
          Вернуться на главную
        </AppButton>
      </Box>
    </Container>
  )
}
