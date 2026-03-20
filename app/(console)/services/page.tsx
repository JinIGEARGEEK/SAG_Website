import { ArrowRight } from "lucide-react"
import { SERVICES } from "@/lib/services-data"
import { SiteNavbar } from "@/components/layout/site-navbar"
import { FooterSection } from "@/components/sections/footer-section"
import { FadeIn } from "@/components/ui/fade-in"

export default function ServicesPage() {
  return (
    <>
      <SiteNavbar />

      {/* ── Hero ── */}
      <section
        className="relative pt-32 pb-20 lg:pt-40 lg:pb-28"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="site-container">
          <p
            className="text-body-small font-medium uppercase tracking-[0.12em] mb-4"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            What We Do
          </p>
          <h1 className="text-heading-1 text-white max-w-2xl mb-5">
            Advisory Services
          </h1>
          <p className="text-body max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>
            We provide a focused range of strategic advisory services to organisations operating across complex regulatory, governance and operational environments.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.12) 70%, transparent)" }}
        />
      </section>

      {/* ── Services list ── */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="site-container">
          <div className="flex flex-col">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 80}>
                <a
                  href={`/services/${service.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 py-12 lg:py-14 border-b items-start transition-colors hover:bg-secondary-bg lg:-mx-10 lg:px-10"
                  style={{ borderColor: "var(--color-light-gray-2)" }}
                >
                  {/* Number */}
                  <div className="lg:col-span-1">
                    <span className="text-body-small font-medium" style={{ color: "var(--color-secondary)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title + subtitle */}
                  <div className="lg:col-span-5">
                    <h2 className="text-title-2 text-primary mb-3 group-hover:text-secondary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-body-small text-dark-gray leading-relaxed">
                      {service.subtitle}
                    </p>
                  </div>

                  {/* Capabilities preview */}
                  <div className="lg:col-span-5">
                    <ul className="flex flex-col gap-2">
                      {service.capabilities.slice(0, 3).map((cap) => (
                        <li
                          key={cap.title}
                          className="flex items-center gap-2 text-body-small"
                          style={{ color: "var(--color-dark-gray)" }}
                        >
                          <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: "var(--color-secondary)" }} />
                          {cap.title}
                        </li>
                      ))}
                      {service.capabilities.length > 3 && (
                        <li className="text-body-small" style={{ color: "rgba(0,0,0,0.3)" }}>
                          +{service.capabilities.length - 3} more
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Arrow */}
                  <div className="lg:col-span-1 flex justify-end lg:pt-1">
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                      style={{ color: "var(--color-secondary)" }}
                    />
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
