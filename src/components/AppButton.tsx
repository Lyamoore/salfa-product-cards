"use client"

import { Button, ButtonProps, CircularProgress } from "@mui/material"
import { ReactNode } from "react"

type AppButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "outlined"

interface AppButtonProps extends Omit<ButtonProps, "variant" | "children"> {
  children: ReactNode
  variant?: AppButtonVariant
  icon?: ReactNode
  isLoading?: boolean
}

const variantMap: Record<AppButtonVariant, ButtonProps["variant"]> = {
  primary: "contained",
  secondary: "contained",
  danger: "contained",
  success: "contained",
  outlined: "outlined",
}

const colorMap: Record<AppButtonVariant, ButtonProps["color"]> = {
  primary: "primary",
  secondary: "inherit",
  danger: "error",
  success: "success",
  outlined: "inherit",
}

export const AppButton = ({
  children,
  variant = "primary",
  icon,
  isLoading = false,
  disabled,
  ...props
}: AppButtonProps) => {
  const muiVariant = variantMap[variant]
  const muiColor = colorMap[variant]

  return (
    <Button
      {...props}
      variant={muiVariant}
      color={muiColor}
      disabled={disabled || isLoading}
      startIcon={isLoading ? <CircularProgress size={20} /> : icon}
    >
      {children}
    </Button>
  )
}
