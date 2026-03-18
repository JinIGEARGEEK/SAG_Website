"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface SelectFieldProps {
  label?: string
  required?: boolean
  error?: string
  disabled?: boolean
  placeholder?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  options: { value: string; label: string }[]
  className?: string
}

function SelectField({
  label,
  required,
  error,
  disabled,
  placeholder = "Select option",
  value,
  defaultValue,
  onValueChange,
  options,
  className,
}: SelectFieldProps) {
  const hasError = !!error
  const hasLabel = !!label

  const selectEl = (
    <Select
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectTrigger
        className={className}
        aria-invalid={hasError || undefined}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

  if (!hasLabel && !hasError) {
    return selectEl
  }

  return (
    <div className="w-full">
      {hasLabel && (
        <label
          className="ds-input-label mb-1 block"
          data-error={hasError || undefined}
          data-disabled={disabled || undefined}
        >
          {label}
          {required && <span className={disabled ? "ml-0.5" : "text-[var(--input-error-color)] ml-0.5"}>*</span>}
        </label>
      )}
      {selectEl}
      {hasError && (
        <div className="ds-input-error">{error}</div>
      )}
    </div>
  )
}

export { SelectField }
export type { SelectFieldProps }
