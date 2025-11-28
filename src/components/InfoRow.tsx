"use client"

import { Typography, TypographyProps } from "@mui/material"

interface InfoRowProps {
  label: string
  value: string | number | undefined | null
  variant?: TypographyProps["variant"]
  bold?: boolean
  truncate?: boolean
}

export const InfoRow = ({
  label,
  value,
  variant = "body2",
  bold = false,
  truncate = false,
}: InfoRowProps) => {
  if (!value) return null

  const sx = truncate
    ? {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        mb: 0.5,
      }
    : { mb: 0.5, textAlign: "inherit" }

  const color = variant === "body2" ? "text.secondary" : undefined
  const labelText = label ? `${label}:` : ""

  return (
    <Typography variant={variant} color={color} sx={sx}>
      {label && bold && <strong>{labelText}</strong>}
      {label && !bold && labelText}
      {label ? " " : ""}
      {value}
    </Typography>
  )
}
