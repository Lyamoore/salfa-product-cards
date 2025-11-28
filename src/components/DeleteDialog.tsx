"use client"

import { Dialog, DialogActions, DialogTitle } from "@mui/material"
import { AppButton } from "./AppButton"

interface DeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title?: string
}

export const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
  title = "Удалить карточку персонажа?",
}: DeleteDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions>
        <AppButton onClick={onClose} variant="secondary">
          Отмена
        </AppButton>
        <AppButton onClick={onConfirm} variant="danger" autoFocus>
          Удалить
        </AppButton>
      </DialogActions>
    </Dialog>
  )
}
