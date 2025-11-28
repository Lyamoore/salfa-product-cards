"use client"

import { ReactNode } from "react"
import { Box, Typography, Divider } from "@mui/material"

interface InfoSectionProps {
  title: string
  children: ReactNode
  showDivider?: boolean
}

export const InfoSection = ({
  title,
  children,
  showDivider = true,
}: InfoSectionProps) => {
  return (
    <>
      {showDivider && <Divider sx={{ my: 2 }} />}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {children}
      </Box>
    </>
  )
}
