"use client"

import { Box } from "@mui/material"
import { AppButton } from "./AppButton"

interface FormActionsProps {
  onSubmit: () => void
  onCancel: () => void
  isSubmitting?: boolean
  submitLabel?: string
}

export const FormActions = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Создать",
}: FormActionsProps) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
      <AppButton
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isSubmitting}
        onClick={onSubmit}
      >
        {submitLabel}
      </AppButton>
      <AppButton
        type="button"
        variant="outlined"
        fullWidth
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Отмена
      </AppButton>
    </Box>
  )
}
