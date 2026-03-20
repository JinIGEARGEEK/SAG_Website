import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { SERVICES, getService } from "@/lib/services-data"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { FadeIn } from "@/components/ui/fade-in"

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }))
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()

  const others = SERVICES.filter((s) => s.slug !== slug)

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
            href="/#advisory"
            className="inline-flex items-center gap-2 text-body-small mb-10 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            <ArrowLeft size={14} />
            Advisory Services
          </a>
          <h1 className="text-heading-1 text-white max-w-3xl mb-5">
            {service.title}
          </h1>
          <p
            className="text-body max-w-2xl leading-relaxed"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            {service.subtitle}
          </p>
        </div>

        {/* Decorative line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent)" }}
        />
      </section>

      {/* ── Overview ── */}
      {/* ── Services Include ── */}
      <section className="pt-20 lg:pt-28 pb-14 bg-white">
        <div className="site-container">
          <FadeIn>
            <div className="mb-14">
              <p className="text-body-small font-medium uppercase tracking-[0.12em] mb-0" style={{ color: "var(--color-secondary)" }}>
                What We Offer
              </p>
              <h2 className="text-heading-2 text-primary max-w-xl">
                Services Include
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {service.services.map((item, i) => (
              <FadeIn key={item.title} delay={i * 70}>
                <div
                  className="relative overflow-hidden rounded p-10 lg:p-12 h-full"
                  style={{ backgroundColor: "var(--color-light-gray-1)" }}
                >
                  <div>
                    <span
                      className="text-body-tiny font-semibold uppercase tracking-[0.14em] block mb-6"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-title-2 text-primary mb-4">{item.title}</h3>
                    <p className="text-body-small text-dark-gray leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


      {/* ── Other Services ── */}
      <section className="pt-14 pb-20 lg:pb-28 bg-white">
        <div className="site-container">
          <FadeIn>
            <div className="mb-10">
              <p className="text-body-small font-medium uppercase tracking-[0.12em] mb-0" style={{ color: "var(--color-secondary)" }}>
                Explore More
              </p>
              <h2 className="text-heading-2 text-primary">Other Advisory Services</h2>
            </div>
          </FadeIn>

          <div className="flex flex-col">
            {others.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 60}>
                <a
                  href={`/services/${s.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-[1fr_2fr_auto] gap-4 lg:gap-16 py-8 border-t items-center transition-colors hover:bg-secondary-bg"
                  style={{ borderColor: "var(--color-light-gray-2)" }}
                >
                  <h3 className="text-title-3 text-primary group-hover:text-primary/60 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-body-small text-dark-gray leading-relaxed">
                    {s.subtitle}
                  </p>
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1 shrink-0"
                    style={{ color: "var(--color-secondary)" }}
                  />
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 lg:py-24" style={{ backgroundColor: "var(--color-light-gray-1)" }}>
        <FadeIn>
          <div className="site-container text-center">
            <h2 className="text-heading-2 text-primary mb-4">
              Discuss Your Requirements
            </h2>
            <p className="text-body text-dark-gray max-w-md mx-auto mb-8">
              All enquiries are treated with the utmost discretion. Contact our senior team to arrange a confidential introduction.
            </p>
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 text-sm font-medium text-white px-8 py-4 rounded transition-opacity hover:opacity-85"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              Request a Confidential Introduction
              <ArrowRight size={16} />
            </a>
          </div>
        </FadeIn>
      </section>

      <FooterSection />
    </>
  )
}
