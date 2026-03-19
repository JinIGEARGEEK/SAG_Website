"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, Globe } from "lucide-react"

const LANGUAGES = [
  { code: "EN", label: "UK-English", flag: "🇬🇧" },
  { code: "RU", label: "Russian",    flag: "🇷🇺" },
  { code: "DE", label: "Deutsche",   flag: "🇩🇪" },
  { code: "AT", label: "Austrian",   flag: "🇦🇹" },
]

export function LanguageSelector() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState(LANGUAGES[0])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-sm transition-colors cursor-pointer"
        style={{ color: "color-mix(in oklch, var(--color-white) 80%, transparent)" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "var(--color-white)" }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "color-mix(in oklch, var(--color-white) 80%, transparent)" }}
      >
        <Globe size={16} style={{ color: "color-mix(in oklch, var(--color-white) 60%, transparent)" }} />
        <span>{selected.code}</span>
        <ChevronDown
          size={14}
          className="transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 top-full mt-3 w-44 rounded overflow-hidden shadow-xl z-50"
          style={{
            backgroundColor: "color-mix(in oklch, var(--color-white) 90%, transparent)",
            backdropFilter: "blur(8px)",
          }}
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === selected.code
            return (
              <button
                key={lang.code}
                onClick={() => { setSelected(lang); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors cursor-pointer hover:bg-light-gray-1 ${isActive ? "bg-light-gray-1" : ""}`}
                style={{ color: isActive ? "var(--color-primary)" : "var(--color-dark-gray)" }}
              >
                <span
                  className="shrink-0 rounded-full overflow-hidden border border-light-gray-2 flex items-center justify-center"
                  style={{ width: 26, height: 26 }}
                >
                  <span style={{ fontSize: 26, lineHeight: 1, display: "block" }}>
                    {lang.flag}
                  </span>
                </span>
                <span>{lang.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
