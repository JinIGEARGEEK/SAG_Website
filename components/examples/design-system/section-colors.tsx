"use client"

import { useMemo } from "react"
import {
  SectionTitle,
  SubTitle,
  DemoCard,
  SectionLabel,
  useDesignTokens,
} from "./shared"

interface SwatchDef {
  token: string
  cssVar: string
  border?: boolean
}

const PRIMARY_COLORS: SwatchDef[] = [
  { token: "primary", cssVar: "--color-primary" },
  { token: "secondary", cssVar: "--color-secondary" },
  { token: "success", cssVar: "--color-success" },
  { token: "info", cssVar: "--color-info" },
  { token: "warning", cssVar: "--color-warning" },
  { token: "error", cssVar: "--color-error" },
]

const NEUTRAL_COLORS: SwatchDef[] = [
  { token: "white", cssVar: "--color-white", border: true },
  { token: "light-gray-1", cssVar: "--color-light-gray-1" },
  { token: "light-gray-2", cssVar: "--color-light-gray-2" },
  { token: "gray", cssVar: "--color-gray" },
  { token: "dark-gray", cssVar: "--color-dark-gray" },
  { token: "black", cssVar: "--color-black" },
]

const BG_COLORS: SwatchDef[] = [
  { token: "primary-bg", cssVar: "--color-primary-bg" },
  { token: "success-bg", cssVar: "--color-success-bg" },
  { token: "info-bg", cssVar: "--color-info-bg" },
  { token: "warning-bg", cssVar: "--color-warning-bg" },
  { token: "error-bg", cssVar: "--color-error-bg" },
]

const HOVER_COLORS: SwatchDef[] = [
  { token: "primary-hover", cssVar: "--color-primary-hover" },
  { token: "secondary-hover", cssVar: "--color-secondary-hover" },
  { token: "success-hover", cssVar: "--color-success-hover" },
  { token: "info-hover", cssVar: "--color-info-hover" },
  { token: "warning-hover", cssVar: "--color-warning-hover" },
  { token: "error-hover", cssVar: "--color-error-hover" },
]

const SHADOW_DEFS = [
  { token: "shadow-1", cssVar: "--shadow-1", desc: "Blur 8px, y: -4" },
  { token: "shadow-2", cssVar: "--shadow-2", desc: "Blur 10px, y: +4" },
  { token: "shadow-3", cssVar: "--shadow-3", desc: "Blur 10px, y: +4 (stronger)" },
]

const ALL_TOKEN_NAMES = [
  ...PRIMARY_COLORS,
  ...NEUTRAL_COLORS,
  ...BG_COLORS,
  ...HOVER_COLORS,
].map((s) => s.cssVar)

function ColorGrid({
  swatches,
  tokens,
}: {
  swatches: SwatchDef[]
  tokens: Record<string, string>
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {swatches.map((s) => (
        <div key={s.token}>
          <div
            className="h-20 rounded-lg mb-2"
            style={{
              backgroundColor: `var(${s.cssVar})`,
              border: s.border ? "1px solid var(--color-light-gray-2)" : undefined,
            }}
          />
          <div className="text-body-small font-semibold">{s.token}</div>
          <div className="text-body-tiny text-dark-gray">
            {tokens[s.cssVar] || ""}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SectionColors() {
  const tokenNames = useMemo(() => ALL_TOKEN_NAMES, [])
  const tokens = useDesignTokens(tokenNames)

  return (
    <div className="space-y-6">
      <SectionTitle number={2}>Color Palette</SectionTitle>

      {/* Primary */}
      <DemoCard>
        <SectionLabel>Primary</SectionLabel>
        <ColorGrid swatches={PRIMARY_COLORS} tokens={tokens} />
      </DemoCard>

      {/* Neutral */}
      <SubTitle>Neutral</SubTitle>
      <DemoCard>
        <SectionLabel>Neutral</SectionLabel>
        <ColorGrid swatches={NEUTRAL_COLORS} tokens={tokens} />
      </DemoCard>

      {/* Background */}
      <SubTitle>Background</SubTitle>
      <DemoCard>
        <SectionLabel>Background</SectionLabel>
        <ColorGrid swatches={BG_COLORS} tokens={tokens} />
      </DemoCard>

      {/* Hover */}
      <SubTitle>Hover</SubTitle>
      <DemoCard>
        <SectionLabel>Hover</SectionLabel>
        <ColorGrid swatches={HOVER_COLORS} tokens={tokens} />
      </DemoCard>

      {/* Shadows */}
      <SubTitle>Shadows</SubTitle>
      <DemoCard>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {SHADOW_DEFS.map((s) => (
            <div key={s.token}>
              <div className="text-body-tiny font-semibold text-dark-gray mb-3">
                {s.token} &middot; {s.desc}
              </div>
              <div
                className="bg-white rounded-lg h-24 flex items-center justify-center text-body-small text-dark-gray"
                style={{ boxShadow: `var(${s.cssVar})` }}
              >
                {s.token}
              </div>
            </div>
          ))}
        </div>
      </DemoCard>
    </div>
  )
}
