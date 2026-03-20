import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SECTORS, getSector } from "@/lib/sectors-data"
import { SERVICES } from "@/lib/services-data"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { FadeIn } from "@/components/ui/fade-in"

export function generateStaticParams() {
  return SECTORS.map((s) => ({ slug: s.slug }))
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sector = getSector(slug)
  if (!sector) notFound()

  const otherSectors = SECTORS.filter((s) => s.slug !== slug)
  const relatedServices = SERVICES.filter((s) =>
    sector.relatedServiceSlugs.includes(s.slug)
  )

  return (
    <>
      <SiteNavbar />

      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="site-container relative z-10">
          <a
            href="/#sectors"
            className="inline-flex items-center gap-2 text-body-small mb-10 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            <ArrowLeft size={14} />
            Sectors We Serve
          </a>
          <h1 className="text-heading-1 text-white max-w-3xl">
            {sector.title}
          </h1>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent)" }}
        />
      </section>

      {/* ── Main content + Sidebar ── */}
      <section className="pt-10 pb-20 lg:py-28 bg-white">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-16 items-start">

            {/* ── Left: main content ── */}
            <div className="min-w-0">

              {/* Description */}
              <FadeIn>
                <p className="text-body text-dark-gray leading-relaxed mb-12">
                  {sector.description}
                </p>
              </FadeIn>

              {/* CTA */}
              <FadeIn>
                <div className="p-10 rounded flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6" style={{ backgroundColor: "var(--color-light-gray-1)" }}>
                  <div>
                    <h2 className="text-title-2 text-primary mb-3">
                      Discuss Your Requirements
                    </h2>
                    <p className="text-body-small text-dark-gray max-w-sm">
                      All enquiries are treated with the utmost discretion. Contact our senior team to arrange a confidential introduction.
                    </p>
                  </div>
                  <a
                    href="/#contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-white px-6 py-3 rounded transition-opacity hover:opacity-85 shrink-0"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    Request a Confidential Introduction
                    <ArrowRight size={16} />
                  </a>
                </div>
              </FadeIn>

            </div>

            {/* ── Right: sticky other sectors ── */}
            <aside className="hidden lg:block sticky top-28">
              <p className="text-title-4 text-primary mb-4">
                Other Sectors
              </p>
              <nav className="flex flex-col">
                {otherSectors.map((s) => (
                  <a
                    key={s.slug}
                    href={`/sectors/${s.slug}`}
                    className="group flex items-center justify-between py-3 border-t text-body-small text-dark-gray hover:text-primary transition-colors"
                    style={{ borderColor: "var(--color-light-gray-2)" }}
                  >
                    {s.title}
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-all -translate-x-1 group-hover:translate-x-0 shrink-0"
                      style={{ color: "var(--color-secondary)" }}
                    />
                  </a>
                ))}
              </nav>
            </aside>

          </div>
        </div>
      </section>

      <FooterSection />
    </>
  )
}
