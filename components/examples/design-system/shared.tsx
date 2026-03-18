"use client"

import { useEffect, useState } from "react"

/* ── useDesignTokens ── */
export function useDesignTokens(tokenNames: string[]) {
  const [values, setValues] = useState<Record<string, string>>({})

  useEffect(() => {
    const root = document.documentElement
    const style = getComputedStyle(root)
    const result: Record<string, string> = {}
    for (const name of tokenNames) {
      const raw = style.getPropertyValue(name).trim()
      result[name] = raw || ""
    }
    setValues(result)
  }, [tokenNames])

  return values
}

/* ── SectionTitle ── */
export function SectionTitle({
  number,
  children,
}: {
  number: number
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center gap-3 pb-4 mb-6">
      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-semibold">
        {number}
      </span>
      <h2 className="text-title-4 uppercase tracking-wider">{children}</h2>
    </div>
  )
}

/* ── SubTitle ── */
export function SubTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mt-10 mb-6 bg-light-gray-1 border-y border-light-gray-2">
      <h3 className="text-title-5 uppercase tracking-wider text-dark-gray">{children}</h3>
    </div>
  )
}

/* ── DemoCard ── */
export function DemoCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`bg-white p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  )
}

/* ── SectionLabel ── */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-bold text-gray uppercase tracking-[0.06em] mb-3">
      {children}
    </div>
  )
}

/* ── CodeBlock ── */
export function CodeBlock({ children }: { children: React.ReactNode }) {
  return (
    <pre className="bg-[var(--color-black)] text-white text-[13px] leading-6 rounded-lg p-5 overflow-x-auto font-mono">
      {children}
    </pre>
  )
}
