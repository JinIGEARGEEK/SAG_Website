"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { Globe, ChevronDown, Menu, X, ArrowRight } from "lucide-react"
import { setLocale } from "@/actions/locale"

const LANGUAGES = [
  { code: "en", country: "gb", label: "UK-English", short: "EN" },
  { code: "ru", country: "ru", label: "Russian",    short: "RU" },
  { code: "de", country: "de", label: "Deutsche",   short: "DE" },
  { code: "at", country: "at", label: "Austrian",   short: "AT" },
] as const

function FlagIcon({ country, size = 20 }: { country: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${country}.png`}
      alt={country}
      width={size}
      height={size}
      style={{ borderRadius: "50%", objectFit: "cover", width: size, height: size, flexShrink: 0 }}
    />
  )
}

const NAV_LINKS = [
  { label: "Home",                   hash: "hero" },
  { label: "About",                  hash: "about" },
  { label: "Situations",             hash: "situations" },
  { label: "Advisory Services",      hash: "advisory" },
  { label: "Sectors",                hash: "sectors" },
  { label: "International Presence", hash: "presence" },
  { label: "Leadership",             hash: "leadership" },
]

export function SiteNavbar() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRefDesktop = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const [, startTransition] = useTransition()
  const currentLang = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

  function getHref(hash: string) {
    return isHome ? `#${hash}` : `/#${hash}`
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!langRefDesktop.current?.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  function handleNavClick() {
    setMenuOpen(false)
  }

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300"
        style={{
          backgroundColor: scrolled || menuOpen ? "var(--color-primary)" : "transparent",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div className="site-container flex items-center justify-between">
          <span className="text-white font-bold text-sm tracking-[0.15em] uppercase select-none">
            Stern Advisory Global
          </span>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={getHref(link.hash)}
                  className="text-white/80 hover:text-white text-sm transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Divider */}
            <span className="w-px h-5 bg-white/20 shrink-0" />

            {/* Language dropdown */}
            <div ref={langRefDesktop} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition-colors"
              >
                <Globe size={15} className="shrink-0" />
                <span className="font-medium">{currentLang.short}</span>
                <ChevronDown
                  size={13}
                  className="transition-transform duration-200"
                  style={{ transform: langOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 top-full mt-2 w-44 rounded-lg overflow-hidden shadow-xl z-50"
                  style={{ backgroundColor: "#fff" }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        startTransition(() => setLocale(lang.code))
                        setLangOpen(false)
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left transition-colors hover:bg-gray-50"
                      style={{
                        backgroundColor: locale === lang.code ? "#f3f4f6" : undefined,
                        fontWeight: locale === lang.code ? 600 : 400,
                        color: "var(--color-primary)",
                      }}
                    >
                      <FlagIcon country={lang.country} size={20} />
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href={getHref("contact")}
              className="border border-white/60 hover:border-white hover:bg-white/10 text-white text-sm px-5 py-2 rounded transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </div>

          {/* Tablet: hamburger */}
          <div className="xl:hidden flex items-center">
            <button
              className="text-white p-1"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col xl:hidden overflow-y-auto"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {/* Spacer for header height */}
          <div className="h-[60px] shrink-0" />

          {/* Nav links */}
          <nav className="flex flex-col px-6 pt-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={getHref(link.hash)}
                onClick={handleNavClick}
                className="flex items-center justify-between py-4 border-b text-white/70 hover:text-white text-lg transition-colors group"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                {link.label}
                <ArrowRight size={16} className="opacity-0 group-hover:opacity-60 transition-opacity" />
              </a>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="px-6 pb-10 pt-8 flex flex-col gap-4">
            <a
              href={getHref("contact")}
              onClick={handleNavClick}
              className="flex items-center justify-center gap-2 bg-white text-sm font-semibold px-7 py-4 rounded transition-opacity hover:opacity-90"
              style={{ color: "var(--color-primary)" }}
            >
              Contact
            </a>

            {/* Language switcher */}
            <div className="flex rounded overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
              {LANGUAGES.map((lang, i) => (
                <button
                  key={lang.code}
                  onClick={() => startTransition(() => setLocale(lang.code))}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors"
                  style={{
                    backgroundColor: locale === lang.code ? "rgba(255,255,255,0.15)" : "transparent",
                    color: locale === lang.code ? "#fff" : "rgba(255,255,255,0.45)",
                    borderRight: i < LANGUAGES.length - 1 ? "1px solid rgba(255,255,255,0.2)" : undefined,
                  }}
                >
                  <FlagIcon country={lang.country} size={18} />
                  <span>{lang.short}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
