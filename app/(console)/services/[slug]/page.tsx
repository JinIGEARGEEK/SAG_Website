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
      <section className="py-20 lg:py-28 bg-white">
        <div className="site-container">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-4">
                <p className="text-body-small font-medium uppercase tracking-[0.12em]" style={{ color: "var(--color-secondary)" }}>
                  Overview
                </p>
              </div>
              <div className="lg:col-span-8 flex flex-col gap-5">
                {service.overview.map((para, i) => (
                  <p key={i} className="text-body text-dark-gray leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Capabilities ── */}
      <section className="py-20 lg:py-28" style={{ backgroundColor: "var(--color-light-gray-1)" }}>
        <div className="site-container">
          <FadeIn>
            <div className="mb-14">
              <p className="text-body-small font-medium uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-secondary)" }}>
                Capabilities
              </p>
              <h2 className="text-heading-2 text-primary max-w-xl">
                Key Areas of Advisory
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "var(--color-light-gray-2)" }}>
            {service.capabilities.map((cap, i) => (
              <FadeIn key={cap.title} delay={i * 60}>
                <div className="bg-white p-8 lg:p-10 h-full">
                  <span
                    className="text-body-tiny font-medium uppercase tracking-[0.1em] mb-4 block"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-title-4 text-primary mb-3">{cap.title}</h3>
                  <p className="text-body-small text-dark-gray leading-relaxed">{cap.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Approach ── */}
      <section className="py-20 lg:py-28" style={{ background: "var(--gradient-primary)" }}>
        <div className="site-container">
          <FadeIn>
            <div className="mb-14">
              <p className="text-body-small font-medium uppercase tracking-[0.12em] mb-3" style={{ color: "rgba(255,255,255,0.45)" }}>
                Our Approach
              </p>
              <h2 className="text-heading-2 text-white max-w-xl">
                How We Work
              </h2>
            </div>
          </FadeIn>

          <div className="flex flex-col">
            {service.approach.map((step, i) => (
              <FadeIn key={step.step} delay={i * 80}>
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-10 lg:py-12 ${i > 0 ? "border-t" : ""}`}
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="lg:col-span-1">
                    <span className="text-title-3 font-bold" style={{ color: "rgba(255,255,255,0.2)" }}>
                      {step.step}
                    </span>
                  </div>
                  <div className="lg:col-span-4">
                    <h3 className="text-title-3 text-white">{step.title}</h3>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-body text-white/65 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Other Services ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="site-container">
          <FadeIn>
            <div className="mb-12">
              <p className="text-body-small font-medium uppercase tracking-[0.12em] mb-3" style={{ color: "var(--color-secondary)" }}>
                Related Services
              </p>
              <h2 className="text-heading-2 text-primary">Other Advisory Areas</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ backgroundColor: "var(--color-light-gray-2)" }}>
            {others.map((s, i) => (
              <FadeIn key={s.slug} delay={i * 60}>
                <a
                  href={`/services/${s.slug}`}
                  className="group flex flex-col justify-between p-8 lg:p-10 h-full bg-white transition-colors hover:bg-secondary-bg"
                >
                  <div>
                    <h3 className="text-title-4 text-primary mb-3 group-hover:text-secondary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-body-small text-dark-gray leading-relaxed line-clamp-3">
                      {s.subtitle}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-body-small font-medium transition-colors" style={{ color: "var(--color-secondary)" }}>
                    Learn more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
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
