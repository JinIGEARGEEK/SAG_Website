import Image from "next/image"
import { ArrowRight, ArrowUpRight, Briefcase, Shield, ShieldCheck, RefreshCw } from "lucide-react"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { FadeIn } from "@/components/ui/fade-in"
import { SectorsSection } from "@/components/sections/sectors-section"
import { GlobalPresenceSection } from "@/components/sections/global-presence-section"
import { LeadershipSection } from "@/components/sections/leadership-section"
import { ContactSection } from "@/components/sections/contact-section"
import { FooterSection } from "@/components/sections/footer-section"

export default function HomePage() {
  return (
    <>
    {/* Sticky Navbar */}
    <SiteNavbar />

    <div id="hero" className="relative flex flex-col overflow-hidden" style={{ background: "var(--gradient-primary)" }}>

      {/* Hero Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center pt-36 pb-16">
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

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a
              href="#contact"
              className="flex items-center justify-center gap-2 bg-white text-[var(--color-primary)] text-sm font-medium px-7 py-3.5 rounded hover:bg-white/90 transition-colors"
            >
              Request Introduction
              <ArrowRight size={16} />
            </a>
            <a
              href="#advisory"
              className="flex items-center justify-center gap-2 border border-white/50 hover:border-white hover:bg-white/20 text-white text-sm font-medium px-7 py-3.5 rounded transition-colors"
            >
              View Our Advisory Services
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* World map image — blends with hero background */}
      <div className="relative w-full select-none pointer-events-none" style={{ height: "480px" }}>
        <Image src="/hero-world-map.jpg" alt="" fill className="object-cover object-center" priority />
        {/* Top fade — strong, covers ~60% so image emerges gradually */}
        <div className="absolute inset-x-0 top-0 z-10" style={{ height: "65%", background: "linear-gradient(to bottom, #0A1F3C 0%, #0A1F3C 20%, rgba(10,31,60,0.85) 45%, rgba(10,31,60,0.4) 70%, transparent 100%)" }} />
        {/* Side vignette */}
        <div className="absolute inset-y-0 left-0 w-40 z-10" style={{ background: "linear-gradient(to right, #0A1F3C, transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-40 z-10" style={{ background: "linear-gradient(to left, #0A1F3C, transparent)" }} />
      </div>

    </div>

      {/* ===== SECTION 2 — Situations We Handle ===== */}
      <section id="about" className="bg-white py-20 lg:py-28">
        <div className="site-container">

          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-heading-2 text-primary mb-1">About Stern Advisory Global</h2>
              <p className="text-body text-dark-gray max-w-2xl mx-auto">
                Stern Advisory Global provides strategic advisory services to organisations operating across complex
                regulatory, governance and operational environments.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SITUATIONS.map((item, i) => (
              <FadeIn key={item.title} delay={i * 80}>
                <div
                  className={`lg:px-8 pb-6 lg:pb-2 ${i < SITUATIONS.length - 1 ? "lg:border-r border-light-gray-2" : ""} ${i < 2 ? "sm:border-b lg:border-b-0 border-light-gray-2" : ""}`}
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary-bg flex items-center justify-center mb-8">
                    <item.Icon size={22} style={{ color: 'var(--color-secondary)' }} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-title-4 text-primary mb-2">{item.title}</h3>
                  <p className="text-body-small text-dark-gray leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ===== SECTION 3 — Advisory Services Grid ===== */}
      <section id="situations" className="pt-20 lg:pt-28" style={{ backgroundColor: "var(--color-light-gray-1)" }}>

        <FadeIn>
          <div className="site-container text-center mb-16">
            <h2 className="text-heading-2 text-primary mb-1">Situations Where Clients Seek Our Support</h2>
            <p className="text-body text-dark-gray max-w-2xl mx-auto">
              Organisations typically engage Stern Advisory Global when they require independent advisory
              support in addressing complex organisational or operational challenges.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-l border-t border-light-gray-2">
          {ADVISORY_SERVICES.map((item, i) => {
            const col3 = i % 3
            return (
              <FadeIn key={item.title} delay={i * 60}>
                <div
                  className="border-b border-r border-light-gray-2 py-12 lg:py-14 h-full"
                  style={{
                    paddingLeft:  col3 === 0 ? "max(2rem, calc((100vw - 1240px) / 2))" : "2rem",
                    paddingRight: col3 === 2 ? "max(2rem, calc((100vw - 1240px) / 2))" : "2rem",
                  }}
                >
                  <h3 className="text-title-4 text-primary mb-2">{item.title}</h3>
                  <p className="text-body-small text-dark-gray leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            )
          })}
        </div>

      </section>

      {/* ===== SECTION 4 — Advisory Services (Dark) ===== */}
      <section id="advisory" className="py-20 lg:py-28" style={{ background: "var(--gradient-primary)" }}>
        <div className="site-container">

          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-heading-2 text-white mb-1">Advisory Services</h2>
              <p className="text-body max-w-2xl mx-auto" style={{ color: "rgba(255,255,255,0.65)" }}>
                Supporting organisations, investors and leadership teams in managing governance,
                operational and security risks across complex environments.
              </p>
            </div>
          </FadeIn>

          <div className="flex flex-col">
            {ADVISORY_SERVICES_DARK.map((item, i) => (
              <FadeIn key={item.title} delay={i * 80}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-10 lg:py-12 ${i > 0 ? "border-t" : ""}`}
                  style={{ borderColor: "rgba(255,255,255,0.12)" }}
                >
                  <div className="flex items-start gap-6">
                    <span className="text-title-3 text-white shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-title-3 text-white">{item.title}</h3>
                  </div>
                  <div className="lg:pl-4">
                    <p className="text-body-small text-white leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <a
                      href={`/services/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-body-small text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
                    >
                      Explore services
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

        </div>
      </section>

      {/* ===== SECTION 5 — Sectors We Serve ===== */}
      <div id="sectors">
        <SectorsSection />
      </div>

      {/* ===== SECTION 6 — International Presence ===== */}
      <div id="presence">
        <GlobalPresenceSection />
      </div>

      {/* ===== SECTION 7 — Leadership ===== */}
      <div id="leadership">
        <LeadershipSection />
      </div>

      {/* ===== SECTION 8 — Contact ===== */}
      <div id="contact">
        <ContactSection />
      </div>

      {/* ===== FOOTER ===== */}
      <FooterSection />
    </>
  )
}

const ADVISORY_SERVICES_DARK = [
  {
    slug: "corporate-risk",
    title: "Corporate Risk & Due Diligence",
    description:
      "Supporting organisations and investors in understanding governance, regulatory and reputational risks associated with potential partners, investments and transactions.",
  },
  {
    slug: "governance",
    title: "Governance & Integrity Advisory",
    description:
      "Supporting organisations in strengthening governance frameworks and reducing people-driven risk across leadership and operational structures.",
  },
  {
    slug: "security",
    title: "Security & Operational Resilience",
    description:
      "Advising organisations on potential physical and organisational security vulnerabilities affecting operational continuity.",
  },
  {
    slug: "cyber-security",
    title: "Cyber Security Advisory",
    description:
      "Supporting organisations in assessing digital vulnerabilities and improving cyber resilience across critical systems and data environments.",
  },
]

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
