"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  label?: string
  required?: boolean
  error?: string
  maxLength?: number
  showCounter?: boolean
}

function Input({
  className,
  type,
  label,
  required,
  error,
  maxLength,
  showCounter,
  disabled,
  value,
  defaultValue,
  onChange,
  ...props
}: InputProps) {
  const [charCount, setCharCount] = React.useState(() => {
    const initial = (value ?? defaultValue ?? "") as string
    return initial.length
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (showCounter) setCharCount(e.target.value.length)
    onChange?.(e)
  }

  // Sync charCount when controlled value changes
  React.useEffect(() => {
    if (value !== undefined && showCounter) {
      setCharCount(String(value).length)
    }
  }, [value, showCounter])

  const hasError = !!error
  const hasLabel = !!label
  const hasCounter = showCounter && maxLength !== undefined

  const inputEl = (
    <input
      type={type}
      data-slot="input"
      aria-invalid={hasError || undefined}
      disabled={disabled}
      maxLength={maxLength}
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      className={cn("ds-input", className)}
      {...props}
    />
  )

  // No label — bare input
  if (!hasLabel && !hasError && !hasCounter) {
    return inputEl
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
      {inputEl}
      {(hasCounter || hasError) && (
        <div className="flex justify-between items-start">
          {hasError ? (
            <div className="ds-input-error flex-1">{error}</div>
          ) : (
            <div className="flex-1" />
          )}
          {hasCounter && (
            <div className={hasError ? "ds-input-error" : "ds-input-counter"}>
              {charCount}/{maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export { Input }
export type { InputProps }
