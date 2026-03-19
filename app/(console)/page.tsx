import Image from "next/image"
import { ChevronDown, Globe, ArrowRight } from "lucide-react"

const NAV_LINKS = [
  "Home",
  "About",
  "Situations",
  "Advisory Services",
  "Sectors",
  "Global Presence",
  "Leadership",
]

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: "var(--gradient-primary)" }}>

      {/* Hero Map Background */}
      <div className="absolute inset-0 select-none pointer-events-none overflow-hidden">
        <Image
          src="/hero-map.svg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Navbar */}
      <header className="relative z-10 w-full py-5">
        <div className="site-container flex items-center justify-between">
        <span className="text-white font-bold text-sm tracking-[0.15em] uppercase select-none">
          Stern Advisory Global
        </span>

        <div className="hidden lg:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/80 hover:text-white text-sm transition-colors whitespace-nowrap"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-white/80 text-sm cursor-pointer hover:text-white transition-colors">
              <Globe size={16} className="text-white/60" />
              <span>EN</span>
              <ChevronDown size={14} />
            </div>
            <div className="w-px h-4 bg-white/30" />
            <a
              href="#"
              className="border border-white/60 hover:border-white hover:bg-white/20 text-white text-sm px-5 py-2 rounded transition-colors whitespace-nowrap"
            >
              Contact
            </a>
          </div>
        </div>
        </div>
      </header>

      {/* Hero Content */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center text-center pt-8 pb-0">
        <div className="site-container flex flex-col items-center">
        <h1 className="text-heading-1 text-white max-w-3xl">
          Strategic Advisory for Governance,
        </h1>
        <h2 className="text-heading-2 text-white/90 mt-3 max-w-2xl">
          Security and Corporate Risk
        </h2>
        <p className="mt-6 text-body text-white/70 max-w-xl leading-relaxed">
          Supporting organisations, investors and leadership teams in managing
          governance, operational and security risks across complex environments.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <a
            href="#"
            className="flex items-center gap-2 bg-white text-[var(--color-primary)] text-sm font-medium px-7 py-3.5 rounded hover:bg-white/90 transition-colors"
          >
            Request Introduction
            <ArrowRight size={16} />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 border border-white/50 hover:border-white hover:bg-white/20 text-white text-sm font-medium px-7 py-3.5 rounded transition-colors"
          >
            View Our Advisory Services
            <ArrowRight size={16} />
          </a>
        </div>
        </div>
      </section>


    </div>
  )
}
