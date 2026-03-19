import Image from "next/image"
import { ChevronDown, Globe, ArrowRight, Briefcase, Shield, ShieldCheck, RefreshCw } from "lucide-react"

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
    <>
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

      {/* ===== SECTION 2 — Situations We Handle ===== */}
      <section className="bg-white py-20 lg:py-28">
        <div className="site-container">

          {/* Heading */}
          <div className="text-center mb-16">
            <h2 className="text-heading-2 text-primary mb-4">
              Situations We Handle
            </h2>
            <p className="text-body text-dark-gray max-w-2xl mx-auto">
              Organisations typically engage Stern Advisory Global when they require independent advisory
              support in addressing complex organisational or operational challenges.
            </p>
          </div>

          {/* 4-column grid with dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {SITUATIONS.map((item, i) => (
              <div
                key={item.title}
                className={`lg:px-8 py-6 lg:py-2 ${i < SITUATIONS.length - 1 ? "lg:border-r border-light-gray-2" : ""} ${i < 2 ? "sm:border-b lg:border-b-0 border-light-gray-2" : ""}`}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary-bg flex items-center justify-center mb-8">
                  <item.Icon size={22} style={{ color: 'var(--color-secondary)' }} strokeWidth={1.5} />
                </div>
                <h3 className="text-title-4 text-primary mb-2">{item.title}</h3>
                <p className="text-body-small text-dark-gray leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ===== SECTION 3 — Advisory Services ===== */}
      <section className="pt-20 lg:pt-28" style={{ backgroundColor: "var(--color-light-gray-1)" }}>

        {/* Heading */}
        <div className="site-container text-center mb-16">
          <h2 className="text-heading-2 text-primary mb-4">Advisory Services</h2>
          <p className="text-body text-dark-gray max-w-2xl mx-auto">
            We provide a broad range of advisory services tailored to the specific needs
            of organisations operating in complex and dynamic environments.
          </p>
        </div>

        {/* Full-width 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-light-gray-2">
          {ADVISORY_SERVICES.map((item) => (
            <div key={item.title} className="border-b border-r border-light-gray-2 px-10 py-12 lg:px-16 lg:py-14">
              <h3 className="text-title-4 text-primary mb-2">{item.title}</h3>
              <p className="text-body-small text-dark-gray leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

      </section>
    </>
  )
}

const ADVISORY_SERVICES = [
  {
    title: "Market Entry",
    description:
      "Supporting organisations, investors and leadership teams in assessing and navigating new market opportunities.",
  },
  {
    title: "Digital Transformation",
    description:
      "Supporting organisations, investors and leadership teams in managing technology-driven change and digital risk.",
  },
  {
    title: "Operational Excellence",
    description:
      "Supporting organisations, investors and leadership teams in optimising processes and operational performance.",
  },
  {
    title: "Merger & Acquisition",
    description:
      "Supporting organisations, investors and leadership teams in due diligence, integration and transaction advisory.",
  },
  {
    title: "Crisis Management",
    description:
      "Supporting organisations, investors and leadership teams in preparing for and responding to critical incidents.",
  },
  {
    title: "Strategic Planning",
    description:
      "Supporting organisations, investors and leadership teams in developing and executing long-term strategic plans.",
  },
]

const SITUATIONS = [
  {
    Icon: Briefcase,
    title: "Governance",
    description:
      "Supporting organisations, investors and leadership teams in managing governance, compliance and board-level challenges.",
  },
  {
    Icon: Shield,
    title: "Security",
    description:
      "Supporting organisations, investors and leadership teams in managing security risks and threat environments.",
  },
  {
    Icon: ShieldCheck,
    title: "Risk Advisory",
    description:
      "Supporting organisations, investors and leadership teams in managing governance, operational and strategic risk.",
  },
  {
    Icon: RefreshCw,
    title: "Operational Resilience",
    description:
      "Supporting organisations, investors and leadership teams in maintaining continuity and operational resilience.",
  },
]
