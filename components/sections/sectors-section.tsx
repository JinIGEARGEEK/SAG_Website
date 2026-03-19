"use client"

import { useState } from "react"
import { Plus, ArrowUpRight } from "lucide-react"

const SECTORS = [
  {
    title: "Financial Services",
    description:
      "We advise financial institutions, banks and asset managers on governance, regulatory risk and operational resilience in complex and evolving market environments.",
  },
  {
    title: "Private Equity",
    description:
      "We support private equity firms and their portfolio companies in navigating governance, due diligence and strategic risk across the investment lifecycle.",
  },
  {
    title: "Energy and Resources",
    description:
      "We advise energy and resource companies on risk strategy, regulatory compliance and operational security across upstream, midstream and downstream activities.",
  },
  {
    title: "Infrastructure and Real Assets",
    description:
      "We provide advisory services to infrastructure owners and operators managing governance, security and resilience challenges across critical asset portfolios.",
  },
  {
    title: "Technology and Digital Economy",
    description:
      "We support technology companies in managing cyber risk, regulatory compliance and governance as they scale across domestic and international markets.",
  },
  {
    title: "Industrial and Manufacturing",
    description:
      "We advise industrial and manufacturing organisations on operational risk, supply chain security and corporate governance in complex operating environments.",
  },
  {
    title: "Media and Communications",
    description:
      "We provide risk and governance advisory to media, broadcast and communications organisations navigating reputational, regulatory and operational challenges.",
  },
  {
    title: "Life Sciences",
    description:
      "We advise life sciences organisations on corporate governance, regulatory risk and operational resilience across research, development and commercialisation.",
  },
  {
    title: "Consumer Markets",
    description:
      "We support consumer-facing businesses in managing brand risk, governance and operational security as they expand across diverse and competitive markets.",
  },
  {
    title: "Legal and Professional Services",
    description:
      "We advise professional services firms on governance, risk management and operational resilience as they manage complex client and regulatory obligations.",
  },
]

export function SectorsSection() {
  const [open, setOpen] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="site-container">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-heading-2 text-primary mb-1">Sectors We Serve</h2>
          <p className="text-body text-dark-gray">
            Stern Advisory Global supports organisations across a range of industries
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: illustration */}
          <div className="relative self-stretch">
            <div
              className="sticky top-24 rounded-sm overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: "var(--color-light-gray-1)", height: "calc(100vh - 8rem)", maxHeight: "100%" }}
            >
              <SectorIllustration index={open} />
            </div>
          </div>

          {/* Right: accordion */}
          <div className="flex flex-col divide-y" style={{ borderColor: "var(--color-light-gray-2)" }}>
            {SECTORS.map((sector, i) => (
              <div key={sector.title}>
                <button
                  className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                  onClick={() => setOpen(i === open ? -1 : i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span
                    className="transition-transform duration-200"
                    style={{
                      fontSize: "16px",
                      fontWeight: 600,
                      color: hovered === i || open === i ? "var(--color-secondary)" : "var(--color-primary)",
                      transform: hovered === i ? "translateY(-1px)" : "translateY(0)",
                      display: "inline-block",
                      transition: "color 0.2s, transform 0.2s",
                    }}
                  >
                    {sector.title}
                  </span>
                  <span
                    style={{
                      color: "var(--color-secondary)",
                      transition: "transform 0.3s",
                      transform: open === i ? "rotate(45deg)" : hovered === i ? "rotate(90deg)" : "rotate(0deg)",
                      display: "inline-flex",
                      flexShrink: 0,
                    }}
                  >
                    <Plus size={18} />
                  </span>
                </button>

                {open === i && (
                  <div className="pb-6">
                    <p className="text-body-small text-dark-gray leading-relaxed mb-3">
                      {sector.description}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-body-small text-primary underline underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      Read more
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* Minimal wireframe illustrations per sector */
function SectorIllustration({ index }: { index: number }) {
  const illustrations = [
    // Financial Services — bar chart
    <svg key="fin" viewBox="0 0 320 260" fill="none" className="w-64 opacity-30">
      <rect x="30" y="120" width="40" height="120" stroke="#0A1F3C" strokeWidth="1.5"/>
      <rect x="90" y="80" width="40" height="160" stroke="#0A1F3C" strokeWidth="1.5"/>
      <rect x="150" y="50" width="40" height="190" stroke="#0A1F3C" strokeWidth="1.5"/>
      <rect x="210" y="90" width="40" height="150" stroke="#0A1F3C" strokeWidth="1.5"/>
      <line x1="20" y1="240" x2="260" y2="240" stroke="#0A1F3C" strokeWidth="1.5"/>
    </svg>,
    // Private Equity — network nodes
    <svg key="pe" viewBox="0 0 320 260" fill="none" className="w-64 opacity-30">
      <circle cx="160" cy="130" r="20" stroke="#0A1F3C" strokeWidth="1.5"/>
      <circle cx="60" cy="70" r="14" stroke="#0A1F3C" strokeWidth="1.5"/>
      <circle cx="260" cy="70" r="14" stroke="#0A1F3C" strokeWidth="1.5"/>
      <circle cx="60" cy="190" r="14" stroke="#0A1F3C" strokeWidth="1.5"/>
      <circle cx="260" cy="190" r="14" stroke="#0A1F3C" strokeWidth="1.5"/>
      <line x1="74" y1="78" x2="142" y2="116" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="246" y1="78" x2="178" y2="116" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="74" y1="182" x2="142" y2="144" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="246" y1="182" x2="178" y2="144" stroke="#0A1F3C" strokeWidth="1"/>
    </svg>,
    // Energy — solar panel grid
    <svg key="energy" viewBox="0 0 320 260" fill="none" className="w-72 opacity-30">
      <rect x="40" y="60" width="240" height="160" stroke="#0A1F3C" strokeWidth="1.5"/>
      <line x1="120" y1="60" x2="120" y2="220" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="200" y1="60" x2="200" y2="220" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="40" y1="113" x2="280" y2="113" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="40" y1="167" x2="280" y2="167" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="160" y1="220" x2="160" y2="250" stroke="#0A1F3C" strokeWidth="1.5"/>
      <line x1="120" y1="250" x2="200" y2="250" stroke="#0A1F3C" strokeWidth="1.5"/>
    </svg>,
    // Infrastructure — bridge
    <svg key="infra" viewBox="0 0 320 260" fill="none" className="w-72 opacity-30">
      <line x1="20" y1="180" x2="300" y2="180" stroke="#0A1F3C" strokeWidth="2"/>
      <line x1="80" y1="80" x2="80" y2="180" stroke="#0A1F3C" strokeWidth="1.5"/>
      <line x1="240" y1="80" x2="240" y2="180" stroke="#0A1F3C" strokeWidth="1.5"/>
      <path d="M80 80 Q160 40 240 80" stroke="#0A1F3C" strokeWidth="1.5" fill="none"/>
      <line x1="110" y1="105" x2="110" y2="180" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="140" y1="90" x2="140" y2="180" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="160" y1="85" x2="160" y2="180" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="180" y1="90" x2="180" y2="180" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="210" y1="105" x2="210" y2="180" stroke="#0A1F3C" strokeWidth="1"/>
    </svg>,
    // Technology — circuit board
    <svg key="tech" viewBox="0 0 320 260" fill="none" className="w-64 opacity-30">
      <rect x="110" y="90" width="100" height="80" stroke="#0A1F3C" strokeWidth="1.5"/>
      <line x1="160" y1="90" x2="160" y2="50" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="140" y1="50" x2="180" y2="50" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="110" y1="130" x2="60" y2="130" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="60" y1="110" x2="60" y2="150" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="210" y1="120" x2="260" y2="120" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="210" y1="150" x2="260" y2="150" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="160" y1="170" x2="160" y2="220" stroke="#0A1F3C" strokeWidth="1"/>
      <rect x="150" y="205" width="20" height="20" stroke="#0A1F3C" strokeWidth="1"/>
    </svg>,
    // Industrial — factory
    <svg key="ind" viewBox="0 0 320 260" fill="none" className="w-72 opacity-30">
      <rect x="40" y="140" width="240" height="100" stroke="#0A1F3C" strokeWidth="1.5"/>
      <rect x="60" y="100" width="50" height="40" stroke="#0A1F3C" strokeWidth="1"/>
      <rect x="130" y="80" width="60" height="60" stroke="#0A1F3C" strokeWidth="1"/>
      <rect x="210" y="110" width="50" height="30" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="80" y1="60" x2="80" y2="100" stroke="#0A1F3C" strokeWidth="2"/>
      <line x1="160" y1="40" x2="160" y2="80" stroke="#0A1F3C" strokeWidth="2"/>
      <line x1="230" y1="70" x2="230" y2="110" stroke="#0A1F3C" strokeWidth="2"/>
      <rect x="140" y="180" width="40" height="60" stroke="#0A1F3C" strokeWidth="1"/>
    </svg>,
    // Media — broadcast tower
    <svg key="media" viewBox="0 0 320 260" fill="none" className="w-64 opacity-30">
      <line x1="160" y1="80" x2="160" y2="220" stroke="#0A1F3C" strokeWidth="2"/>
      <line x1="120" y1="220" x2="200" y2="220" stroke="#0A1F3C" strokeWidth="1.5"/>
      <path d="M120 100 Q160 60 200 100" stroke="#0A1F3C" strokeWidth="1.5" fill="none"/>
      <path d="M90 80 Q160 30 230 80" stroke="#0A1F3C" strokeWidth="1" fill="none"/>
      <path d="M60 60 Q160 0 260 60" stroke="#0A1F3C" strokeWidth="1" fill="none"/>
      <circle cx="160" cy="80" r="6" stroke="#0A1F3C" strokeWidth="1.5"/>
    </svg>,
    // Life Sciences — DNA helix
    <svg key="life" viewBox="0 0 320 260" fill="none" className="w-48 opacity-30">
      <path d="M130 40 Q180 70 130 100 Q80 130 130 160 Q180 190 130 220" stroke="#0A1F3C" strokeWidth="1.5" fill="none"/>
      <path d="M190 40 Q140 70 190 100 Q240 130 190 160 Q140 190 190 220" stroke="#0A1F3C" strokeWidth="1.5" fill="none"/>
      <line x1="152" y1="55" x2="168" y2="55" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="138" y1="85" x2="180" y2="85" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="138" y1="115" x2="180" y2="115" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="152" y1="145" x2="168" y2="145" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="138" y1="175" x2="180" y2="175" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="152" y1="205" x2="168" y2="205" stroke="#0A1F3C" strokeWidth="1"/>
    </svg>,
    // Consumer Markets — shopping/retail
    <svg key="cons" viewBox="0 0 320 260" fill="none" className="w-64 opacity-30">
      <path d="M100 80 L80 160 L240 160 L220 80 Z" stroke="#0A1F3C" strokeWidth="1.5" fill="none"/>
      <path d="M130 80 Q130 50 160 50 Q190 50 190 80" stroke="#0A1F3C" strokeWidth="1.5" fill="none"/>
      <rect x="70" y="160" width="180" height="50" stroke="#0A1F3C" strokeWidth="1"/>
      <line x1="80" y1="200" x2="100" y2="200" stroke="#0A1F3C" strokeWidth="1"/>
      <circle cx="90" cy="215" r="8" stroke="#0A1F3C" strokeWidth="1"/>
      <circle cx="210" cy="215" r="8" stroke="#0A1F3C" strokeWidth="1"/>
    </svg>,
    // Legal — scales
    <svg key="legal" viewBox="0 0 320 260" fill="none" className="w-64 opacity-30">
      <line x1="160" y1="50" x2="160" y2="210" stroke="#0A1F3C" strokeWidth="2"/>
      <line x1="100" y1="210" x2="220" y2="210" stroke="#0A1F3C" strokeWidth="1.5"/>
      <line x1="160" y1="90" x2="80" y2="110" stroke="#0A1F3C" strokeWidth="1.5"/>
      <line x1="160" y1="90" x2="240" y2="110" stroke="#0A1F3C" strokeWidth="1.5"/>
      <path d="M60 110 Q80 150 100 110" stroke="#0A1F3C" strokeWidth="1.5" fill="none"/>
      <path d="M220 110 Q240 150 260 110" stroke="#0A1F3C" strokeWidth="1.5" fill="none"/>
      <circle cx="160" cy="85" r="6" stroke="#0A1F3C" strokeWidth="1.5"/>
    </svg>,
  ]

  return illustrations[index] ?? illustrations[0]
}
