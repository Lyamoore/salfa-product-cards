"use client"

import { ReactNode } from "react"
import { Box, Divider } from "@mui/material"
import { InfoRow } from "./InfoRow"

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
        <Box sx={{ mb: 1 }}>
          <InfoRow label="" value={title} variant="h6" />
        </Box>
        {children}
      </Box>
    </>
  )
}
