"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  SectionTitle,
  SubTitle,
  DemoCard,
  useDesignTokens,
} from "./shared"

const TITLE_TOKENS = [1, 2, 3, 4, 5, 6] as const

// Matches the token names in the target's design-tokens.css
const STATIC_TOKENS = [
  { key: "body",         cssPrefix: "--font-body",        className: "text-body",         label: "Body text" },
  { key: "body-sm",      cssPrefix: "--font-body-sm",     className: "text-body-small",   label: "Body Small" },
  { key: "body-xs",      cssPrefix: "--font-body-xs",     className: "text-body-tiny",    label: "Body XS" },
  { key: "button",       cssPrefix: "--font-button",      className: "text-button",       label: "Button Text" },
  { key: "button-sm",    cssPrefix: "--font-button-sm",   className: "text-button-small", label: "Button Small" },
  { key: "link",         cssPrefix: "--font-link",        className: "text-link",         label: "Link text" },
] as const

const STATIC_TOKEN_NAMES = STATIC_TOKENS.flatMap((t) => [
  `${t.cssPrefix}-size`,
  `${t.cssPrefix}-lh`,
  `${t.cssPrefix}-weight`,
])

const WEIGHT_LABELS: Record<string, string> = {
  "400": "Regular 400",
  "500": "Medium 500",
  "600": "SemiBold 600",
  "700": "Bold 700",
}

function weightLabel(w: string) {
  return WEIGHT_LABELS[w] || w
}

/** Read computed font-size and line-height from title preview elements */
function useComputedTitleStyles(refs: React.RefObject<(HTMLDivElement | null)[]>) {
  const [styles, setStyles] = useState<
    { fontSize: string; lineHeight: string }[]
  >(TITLE_TOKENS.map(() => ({ fontSize: "", lineHeight: "" })))

  useEffect(() => {
    function measure() {
      const els = refs.current
      if (!els) return
      setStyles(
        els.map((el) => {
          if (!el) return { fontSize: "", lineHeight: "" }
          const cs = getComputedStyle(el)
          return {
            fontSize: `${Math.round(parseFloat(cs.fontSize))}px`,
            lineHeight: `${Math.round(parseFloat(cs.lineHeight))}px`,
          }
        })
      )
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [refs])

  return styles
}

export function SectionTypography() {
  const tokens = useDesignTokens(useMemo(() => STATIC_TOKEN_NAMES, []))
  const titleRefs = useRef<(HTMLDivElement | null)[]>([])
  const computedStyles = useComputedTitleStyles(titleRefs)

  const titleWeight = useDesignTokens(
    useMemo(() => TITLE_TOKENS.map((n) => `--font-title-${n}-weight`), [])
  )

  return (
    <div className="space-y-6">
      <SectionTitle number={1}>Typography</SectionTitle>

      {/* Font Family */}
      <DemoCard>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">
          <div>
            <div className="text-title-2 mb-2">Geist Sans</div>
            <div className="flex gap-6 mb-4">
              <span style={{ fontWeight: 400 }}>Regular 400</span>
              <span style={{ fontWeight: 500 }}>Medium 500</span>
              <span style={{ fontWeight: 600 }}>SemiBold 600</span>
              <span style={{ fontWeight: 700 }}>Bold 700</span>
            </div>
            <div className="text-dark-gray text-[13px] leading-5">
              abcdefghijklmnopqrstuvwxyz
              <br />
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              0123456789
            </div>
          </div>
          <div className="text-[64px] sm:text-[96px] font-semibold text-dark-gray leading-none select-none shrink-0">
            Aa
          </div>
        </div>
      </DemoCard>

      {/* Responsive Titles */}
      <SubTitle>Title (Responsive)</SubTitle>
      <div className="flex items-start gap-3 rounded-lg bg-info-bg border border-info/20 px-4 py-3 mb-4">
        <span className="text-info text-lg leading-none mt-0.5">&#9432;</span>
        <div className="text-body-small">
          <span className="font-semibold">Responsive:</span> Title sizes change
          automatically based on screen width. Resize your browser window to see
          the font size and line height update live.
        </div>
      </div>
      <DemoCard>
        {/* Desktop: grid table layout */}
        <div className="hidden md:block space-y-0">
          <div className="grid grid-cols-[140px_1fr_120px_120px_180px] gap-4 pb-2 mb-1 border-b border-light-gray-2">
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Token</span>
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Preview</span>
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Size / Line Height</span>
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Weight</span>
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Class</span>
          </div>
          {TITLE_TOKENS.map((n, i) => {
            const { fontSize, lineHeight } = computedStyles[i]
            const weight = titleWeight[`--font-title-${n}-weight`] || "600"
            return (
              <div
                key={n}
                className="grid grid-cols-[140px_1fr_120px_120px_180px] gap-4 items-center py-3 border-b border-light-gray-1 last:border-0"
              >
                <div>
                  <code className="text-[13px] bg-light-gray-1 px-2 py-0.5 rounded">
                    {`title-${n}`}
                  </code>
                </div>
                <div
                  ref={(el) => { titleRefs.current[i] = el }}
                  className={`text-title-${n}`}
                >
                  Title {n}
                </div>
                <div className="text-body-small text-dark-gray">
                  {fontSize} / {lineHeight}
                </div>
                <div className="text-body-small text-dark-gray">
                  {weightLabel(weight)}
                </div>
                <code className="text-[13px] bg-light-gray-1 px-2 py-0.5 rounded w-fit">
                  .text-title-{n}
                </code>
              </div>
            )
          })}
        </div>

        {/* Mobile: stacked card layout */}
        <div className="md:hidden space-y-4">
          {TITLE_TOKENS.map((n, i) => {
            const { fontSize, lineHeight } = computedStyles[i]
            const weight = titleWeight[`--font-title-${n}-weight`] || "600"
            return (
              <div
                key={n}
                className="border-b border-light-gray-1 last:border-0 pb-4 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-[13px] bg-light-gray-1 px-2 py-0.5 rounded">
                    title-{n}
                  </code>
                  <code className="text-[11px] text-gray bg-light-gray-1 px-1.5 py-0.5 rounded">
                    .text-title-{n}
                  </code>
                </div>
                <div
                  ref={(el) => {
                    if (!titleRefs.current[i]) titleRefs.current[i] = el
                  }}
                  className={`text-title-${n} mb-2`}
                >
                  Heading Title {n}
                </div>
                <div className="flex gap-4 text-[12px] text-dark-gray">
                  <span>{fontSize} / {lineHeight}</span>
                  <span>{weightLabel(weight)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </DemoCard>

      {/* Static */}
      <SubTitle>Static (Body / Button / Link)</SubTitle>
      <DemoCard>
        {/* Desktop: grid table layout */}
        <div className="hidden md:block space-y-0">
          <div className="grid grid-cols-[140px_1fr_120px_120px_180px] gap-4 pb-2 mb-1 border-b border-light-gray-2">
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Token</span>
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Preview</span>
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Size / Line Height</span>
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Weight</span>
            <span className="text-[11px] font-bold text-gray uppercase tracking-[0.06em]">Class</span>
          </div>
          {STATIC_TOKENS.map((t) => {
            const size = tokens[`${t.cssPrefix}-size`] || ""
            const lh = tokens[`${t.cssPrefix}-lh`] || ""
            const weight = tokens[`${t.cssPrefix}-weight`] || ""
            const isLink = t.key === "link"
            return (
              <div
                key={t.key}
                className="grid grid-cols-[140px_1fr_120px_120px_180px] gap-4 items-center py-3 border-b border-light-gray-1 last:border-0"
              >
                <div>
                  <code className="text-[13px] bg-light-gray-1 px-2 py-0.5 rounded">
                    {t.key}
                  </code>
                </div>
                <div className={`${t.className} ${isLink ? "text-primary underline" : ""}`}>
                  {t.label}
                </div>
                <div className="text-body-small text-dark-gray">
                  {size} / {lh}
                </div>
                <div className="text-body-small text-dark-gray">
                  {weightLabel(weight)}
                </div>
                <code className="text-[13px] bg-light-gray-1 px-2 py-0.5 rounded w-fit">
                  .{t.className}
                </code>
              </div>
            )
          })}
        </div>

        {/* Mobile: stacked card layout */}
        <div className="md:hidden space-y-4">
          {STATIC_TOKENS.map((t) => {
            const size = tokens[`${t.cssPrefix}-size`] || ""
            const lh = tokens[`${t.cssPrefix}-lh`] || ""
            const weight = tokens[`${t.cssPrefix}-weight`] || ""
            const isLink = t.key === "link"
            return (
              <div
                key={t.key}
                className="border-b border-light-gray-1 last:border-0 pb-3 last:pb-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <code className="text-[13px] bg-light-gray-1 px-2 py-0.5 rounded">
                    {t.key}
                  </code>
                  <code className="text-[11px] text-gray bg-light-gray-1 px-1.5 py-0.5 rounded">
                    .{t.className}
                  </code>
                </div>
                <div className={`${t.className} mb-1 ${isLink ? "text-primary underline" : ""}`}>
                  {t.label}
                </div>
                <div className="flex gap-4 text-[12px] text-dark-gray">
                  <span>{size} / {lh}</span>
                  <span>{weightLabel(weight)}</span>
                </div>
              </div>
            )
          })}
        </div>
      </DemoCard>
    </div>
  )
}
