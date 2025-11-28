"use client"

import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material"

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
        <Button onClick={onClose}>Отмена</Button>
        <Button color="error" onClick={onConfirm} autoFocus>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  )
}
