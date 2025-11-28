"use client"

import { Controller, Control, FieldValues, Path } from "react-hook-form"
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material"

interface FormFieldProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  placeholder?: string
  error?: string
  type?: "text" | "select"
  options?: Array<{ value: string; label: string }>
  isSubmitting?: boolean
  required?: boolean
}

const SelectField = ({
  field,
  label,
  options,
  error,
  isSubmitting,
}: {
  field: any // eslint-disable-line @typescript-eslint/no-explicit-any
  label: string
  options: Array<{ value: string; label: string }>
  error?: string
  isSubmitting?: boolean
}) => (
  <FormControl fullWidth error={!!error} disabled={isSubmitting}>
    <InputLabel>{label}</InputLabel>
    <Select
      {...field}
      label={label}
      value={field.value ?? ""}
      MenuProps={{
        disableScrollLock: true,
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
    {error && <FormHelperText>{error}</FormHelperText>}
  </FormControl>
)

export const FormField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  error,
  type = "text",
  options = [],
  isSubmitting = false,
  required = false,
}: FormFieldProps<T>) => {
  const labelWithRequired = `${label}${required ? " *" : ""}`

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) =>
        type === "select" ? (
          <SelectField
            field={field}
            label={label}
            options={options}
            error={error}
            isSubmitting={isSubmitting}
          />
        ) : (
          <TextField
            {...field}
            label={labelWithRequired}
            placeholder={placeholder}
            error={!!error}
            helperText={error}
            fullWidth
            disabled={isSubmitting}
          />
        )
      }
    />
  )
}
