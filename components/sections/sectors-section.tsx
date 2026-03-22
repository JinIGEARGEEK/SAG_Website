"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Plus, ArrowUpRight } from "lucide-react"
import { SECTORS } from "@/lib/sectors-data"

export function SectorsSection() {
  const [open, setOpen] = useState(-1)
  const [hovered, setHovered] = useState<number | null>(null)
  const [imageHeight, setImageHeight] = useState<number | undefined>(undefined)
  const accordionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (accordionRef.current) {
      setImageHeight(accordionRef.current.offsetHeight)
    }
  }, [])

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left: illustration — hidden on mobile/tablet */}
          <div
            className="hidden lg:block relative overflow-hidden"
            style={{ height: imageHeight }}
          >
            <Image
              src="/sector_image.png"
              alt="Sectors illustration"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: accordion */}
          <div ref={accordionRef} className="flex flex-col divide-y" style={{ borderColor: "var(--color-light-gray-2)" }}>
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
                    <p className="text-body-small text-dark-gray leading-relaxed mb-3 line-clamp-2">
                      {sector.description}
                    </p>
                    <a
                      href={`/sectors/${sector.slug}`}
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

