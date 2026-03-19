"use client"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { LanguageSelector } from "@/components/layout/language-selector"

const NAV_LINKS = [
  { label: "Home",                   href: "#hero" },
  { label: "About",                  href: "#about" },
  { label: "Situations",             href: "#situations" },
  { label: "Advisory Services",      href: "#advisory" },
  { label: "Sectors",                href: "#sectors" },
  { label: "International Presence", href: "#presence" },
  { label: "Leadership",             href: "#leadership" },
]

export function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
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
          <div className="hidden lg:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-white/80 hover:text-white text-sm transition-colors whitespace-nowrap"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-4">
              <LanguageSelector />
              <div className="w-px h-4 bg-white/30" />
              <a
                href="#contact"
                className="border border-white/60 hover:border-white hover:bg-white/10 text-white text-sm px-5 py-2 rounded transition-colors whitespace-nowrap"
              >
                Contact
              </a>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col pt-20 pb-10 px-6 lg:hidden"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <nav className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={handleNavClick}
                className="py-4 text-white/80 hover:text-white text-base transition-colors border-b"
                style={{
                  borderColor: "rgba(255,255,255,0.1)",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="#contact"
              onClick={handleNavClick}
              className="flex items-center justify-center gap-2 bg-white text-sm font-medium px-7 py-3.5 rounded transition-colors"
              style={{ color: "var(--color-primary)" }}
            >
              Contact Us
            </a>
          </div>

          <div className="mt-auto pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            <LanguageSelector />
          </div>
        </div>
      )}
    </>
  )
}
