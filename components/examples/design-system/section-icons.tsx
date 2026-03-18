"use client"

import {
  SectionTitle,
  DemoCard,
  SectionLabel,
} from "./shared"
import { MaterialIcon } from "@/components/ui/material-icon"

/* Example icons — swap these to preview any icon from Material Symbols */
const EXAMPLE_ICONS = [
  "search",
  "arrow_left_alt",
  "arrow_right_alt",
  "calendar_month",
  "keyboard_arrow_down",
  "keyboard_arrow_up",
  "filter_list",
  "schedule",
  "menu",
  "language",
  "check",
  "close",
  "bar_chart",
  "insert_chart",
  "content_copy",
  "call",
  "mail",
  "storefront",
  "today",
  "home",
  "person",
  "favorite",
  "visibility",
  "edit",
  "delete",
  "add",
  "download",
  "upload",
  "share",
  "dashboard",
  "school",
  "shopping_cart",
  "sell",
  "description",
  "group",
  "payments",
  "notifications",
  "settings",
]

function IconGrid({ icons }: { icons: string[] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {icons.map((name) => (
        <div
          key={name}
          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-light-gray-1 transition-colors"
        >
          <MaterialIcon name={name} size={24} className="text-[var(--color-black)]" />
          <div className="text-body-tiny text-center truncate max-w-full">
            {name}
          </div>
        </div>
      ))}
    </div>
  )
}

export function SectionIcons() {
  return (
    <div className="space-y-6">
      <SectionTitle number={3}>Icons &amp; Logo</SectionTitle>

      <DemoCard>
        <div className="mb-5">
          <div className="text-title-5 mb-2">
            Material Symbols (New) : Rounded
          </div>
          <p className="text-body-small text-dark-gray max-w-2xl">
            Material Symbols are our icon set — over 3,000 glyphs in a single
            variable font. Supports adjustable weight, fill, grade, and optical
            size.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="inline-flex items-center rounded-md bg-light-gray-1 px-3 py-1 text-body-tiny font-semibold">
            Style: Rounded
          </span>
          <span className="inline-flex items-center rounded-md bg-light-gray-1 px-3 py-1 text-body-tiny font-semibold">
            Weight: 300
          </span>
          <span className="inline-flex items-center rounded-md bg-light-gray-1 px-3 py-1 text-body-tiny font-semibold">
            Source: Google Fonts
          </span>
        </div>

        <SectionLabel>Example Icons</SectionLabel>
        <IconGrid icons={EXAMPLE_ICONS} />
      </DemoCard>
    </div>
  )
}
